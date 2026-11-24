# Tests des règles de sécurité (RLS) de supabase/anidex.sql sur un PostgreSQL local.
# Mode d'emploi : voir supabase/tests/README.md
import os, subprocess, sys
D = os.environ.get('PGHOST', '/tmp/anidex-pg')
PORT = os.environ.get('PGPORT', '54329')
A, B, C, DD = 'aaaaaaaa-0000-0000-0000-00000000000a', 'bbbbbbbb-0000-0000-0000-00000000000b', 'cccccccc-0000-0000-0000-00000000000c', 'dddddddd-0000-0000-0000-00000000000d'
def run(user, sql, role='authenticated'):
    pre = f"set role {role}; select set_config('request.jwt.claim.sub', '{user or ''}', false);"
    p = subprocess.run(['psql', '-h', D, '-p', PORT, '-U', 'postgres', '-d', os.environ.get('PGDATABASE', 't'), '-X', '-A', '-t', '-q', '-v', 'ON_ERROR_STOP=1', '-c', pre + sql],
                       capture_output=True, text=True)
    out = '\n'.join(l for l in p.stdout.strip().split('\n') if l.strip() and l.strip() != (user or ''))
    return p.returncode == 0, out.strip(), p.stderr.strip().split('\n')[0] if p.stderr else ''
results = []
def check(name, cond, detail=''):
    results.append((name, cond, detail))
def expect_ok(name, user, sql, contains=None, role='authenticated'):
    ok, out, err = run(user, sql, role)
    cond = ok and (contains is None or contains in out)
    check(name, cond, err or out[:160])
    return out
def expect_fail(name, user, sql, msg=None, role='authenticated'):
    ok, out, err = run(user, sql, role)
    cond = (not ok) and (msg is None or msg in err)
    check(name, cond, err or out[:160])
def expect_rows(name, user, sql, n, role='authenticated'):
    ok, out, err = run(user, sql, role)
    got = out.strip()
    check(name, ok and got == str(n), err or f'obtenu {got}, attendu {n}')

# Création des profils
pa = expect_ok('A crée son profil', A, "select friend_code from public.create_profile('Alice');")
pb = expect_ok('B crée son profil', B, "select friend_code from public.create_profile('Bob');")
expect_ok('C crée son profil', C, "select friend_code from public.create_profile('Chloé');")
code_a, code_b = pa.strip(), pb.strip()
check('Code ami : 8 caractères sans ambiguïté', len(code_b) == 8 and all(ch in 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' for ch in code_b), code_b)
expect_fail('Pseudo trop court refusé', DD, "select public.create_profile('x');", 'check')
expect_fail('Pseudo avec caractères spéciaux refusé', DD, "select public.create_profile('<script>');", 'check')
expect_fail('Non connecté : création de profil refusée', None, "select public.create_profile('Zed');", 'not_authenticated')

# Visibilité avant amitié
expect_rows('A ne voit pas le profil de B avant amitié', A, f"select count(*) from public.profiles where id = '{B}';", 0)
expect_rows('A ne voit que son profil', A, "select count(*) from public.profiles;", 1)
expect_ok('get_friend(B) par A = vide avant amitié', A, f"select coalesce(public.get_friend('{B}')::text, 'NULL');", 'NULL')

# Ajout d'ami par code
expect_fail('Ajouter son propre code est refusé', A, f"select public.add_friend('{code_a}');", 'own_code')
expect_fail('Code inexistant refusé', A, "select public.add_friend('ZZZZZZZZ');", 'code_not_found')
expect_ok('A ajoute B avec son code (minuscules + tiret acceptés)', A, f"select public.add_friend('{code_b[:4].lower()}-{code_b[4:].lower()}');", 'Bob')
expect_rows('A voit maintenant B', A, f"select count(*) from public.profiles where id = '{B}';", 1)
expect_rows('B voit A (amitié réciproque)', B, f"select count(*) from public.profiles where id = '{A}';", 1)
expect_rows('C ne voit ni A ni B', C, f"select count(*) from public.profiles where id in ('{A}','{B}');", 0)
expect_ok('get_friends de A contient Bob', A, "select public.get_friends()::text;", 'Bob')

# Modifications interdites sur les données des autres
expect_ok('A synchronise sa progression', A, "select public.sync_progress(120, 3, '{1,6,41}', '{first,ten}', 5);")
expect_ok('B lit la progression de son ami A', B, f"select xp from public.progress where user_id = '{A}';", '120')
expect_rows('C ne lit pas la progression de A', C, f"select count(*) from public.progress where user_id = '{A}';", 0)
expect_rows('B ne peut pas modifier la progression de A (0 ligne)', B, f"with u as (update public.progress set xp = 999999 where user_id = '{A}' returning 1) select count(*) from u;", 0)
expect_fail('B ne peut pas créer une progression au nom de C', B, f"insert into public.progress (user_id, xp) values ('{C}', 5);")
expect_fail('A ne peut pas changer son code ami directement', A, f"update public.profiles set friend_code = 'AAAAAAAA' where id = '{A}';", 'permission denied')
expect_rows('B ne peut pas renommer A (0 ligne)', B, f"with u as (update public.profiles set pseudo = 'Pirate' where id = '{A}' returning 1) select count(*) from u;", 0)
expect_ok('A peut changer son pseudo', A, "select public.set_pseudo('Alice B'); select pseudo from public.profiles where id = auth.uid();", 'Alice B')
expect_fail('Valeur aberrante refusée (XP négatif)', A, "select public.sync_progress(-5, 1, '{}', '{}', 0);", 'check')
expect_fail('A ne peut pas créer d’amitié directement', A, f"insert into public.friendships values ('{A}', '{C}');", 'permission denied')

# Observations : pas de GPS, et pas de lieu pour les espèces menacées
expect_ok('A partage 3 observations', A, """select public.sync_sightings('[
  {"id":"s1","animal_id":1,"observed_on":"2026-11-10","state":"QLD"},
  {"id":"s2","animal_id":6,"observed_on":"2026-11-11","state":"VIC"},
  {"id":"s3","animal_id":143,"observed_on":"2026-11-12","state":"VIC"}]'::jsonb);""")
expect_ok('Espèce non menacée : État conservé', B, f"select state from public.shared_sightings where user_id = '{A}' and id = 's1';", 'QLD')
expect_ok('Koala (menacé) : État effacé par le serveur', B, f"select coalesce(state, 'NULL') from public.shared_sightings where user_id = '{A}' and id = 's2';", 'NULL')
expect_ok('Possum de Leadbeater : État effacé', B, f"select coalesce(state, 'NULL') from public.shared_sightings where user_id = '{A}' and id = 's3';", 'NULL')
expect_ok('Même en écriture directe, l’État est effacé', A, f"insert into public.shared_sightings values ('{A}', 's4', 145, '2026-11-13', 'TAS'); select coalesce(state,'NULL') from public.shared_sightings where id = 's4';", 'NULL')
expect_ok('Aucune colonne de coordonnées dans la table', A, "select string_agg(column_name, ',' order by column_name) from information_schema.columns where table_name = 'shared_sightings';", 'animal_id,id,observed_on,state,user_id')
expect_fail('B ne peut pas publier une observation au nom de A', B, f"insert into public.shared_sightings values ('{A}', 'x', 1, '2026-01-01', 'NSW');")
expect_rows('B ne peut pas supprimer les observations de A (0 ligne)', B, f"with d as (delete from public.shared_sightings where user_id = '{A}' returning 1) select count(*) from d;", 0)
expect_rows('C ne voit pas les observations de A', C, f"select count(*) from public.shared_sightings where user_id = '{A}';", 0)
expect_ok('sync_sightings remplace la liste (suppression des absentes)', A, """select public.sync_sightings('[{"id":"s1","animal_id":1,"observed_on":"2026-11-10","state":"QLD"}]'::jsonb); select count(*) from public.shared_sightings where user_id = auth.uid();""", '1')
expect_ok('get_friend(A) par B : observations sans GPS', B, f"select public.get_friend('{A}')::text;", '"state": "QLD"')

# Personne non connectée (rôle anon)
expect_fail('anon : lecture des profils refusée', None, "select count(*) from public.profiles;", 'permission denied', role='anon')
expect_fail('anon : appel de fonction refusé', None, "select public.get_friends();", 'permission denied', role='anon')
expect_fail('anon : ajout d’ami refusé', None, "select public.add_friend('AAAAAAAA');", 'permission denied', role='anon')

# Retrait d'ami et suppression de compte
expect_ok('B retire A de ses amis', B, f"select public.remove_friend('{A}');")
expect_rows('A ne voit plus B après retrait', A, f"select count(*) from public.profiles where id = '{B}';", 0)
expect_rows('B ne voit plus les observations de A', B, f"select count(*) from public.shared_sightings where user_id = '{A}';", 0)
new_code = expect_ok('A régénère son code', A, "select public.regenerate_friend_code();")
check('Nouveau code différent de l’ancien', new_code.strip() not in ('', code_a), new_code)
expect_ok('A supprime son compte', A, "select public.delete_my_account();")
expect_rows('Plus aucune donnée de A (cascade)', None, f"select (select count(*) from public.profiles where id='{A}') + (select count(*) from public.progress where user_id='{A}') + (select count(*) from public.shared_sightings where user_id='{A}') + (select count(*) from auth.users where id='{A}');", 0, role='postgres')

fails = [r for r in results if not r[1]]
for name, ok, detail in results:
    print(('✅' if ok else '❌'), name, '' if ok else f'  → {detail}')
print(f'\n{len(results) - len(fails)}/{len(results)} tests réussis')
sys.exit(1 if fails else 0)
