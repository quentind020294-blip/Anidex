-- ════════════════════════════════════════════════════════════════════════════
-- Anidex — système d'amis (Supabase / PostgreSQL)
--
-- À coller tel quel dans Supabase : SQL Editor → New query → Run.
-- Le script peut être relancé sans risque (il ne supprime aucune donnée).
--
-- Principes de sécurité :
-- • RLS (Row Level Security) activé sur toutes les tables : chacun ne peut
--   modifier que ses propres données, et ne lit que les siennes et celles de ses amis.
-- • Le rôle « anon » (personne non connectée) n'a accès à rien.
-- • Aucune position GPS n'est stockée : seulement l'État (NSW, VIC…).
-- • Pour les espèces menacées, même l'État est effacé (déclencheur ci-dessous).
-- • Les opérations sensibles (code ami, ajout/retrait d'un ami, suppression du
--   compte) passent par des fonctions contrôlées.
-- ════════════════════════════════════════════════════════════════════════════

-- ─── Tables ─────────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  pseudo text not null
    check (char_length(pseudo) between 3 and 20 and pseudo ~ '^[[:alnum:]À-ÖØ-öø-ÿ _.''-]+$'),
  -- 8 caractères sans ambiguïté (pas de 0/O ni de 1/I).
  friend_code text not null unique check (friend_code ~ '^[A-HJ-NP-Z2-9]{8}$'),
  created_at timestamptz not null default now()
);

create table if not exists public.progress (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  xp integer not null default 0 check (xp between 0 and 1000000),
  level integer not null default 1 check (level between 1 and 100),
  discovered smallint[] not null default '{}' check (cardinality(discovered) <= 1000),
  badges text[] not null default '{}' check (cardinality(badges) <= 200),
  sightings_count integer not null default 0 check (sightings_count between 0 and 100000),
  updated_at timestamptz not null default now()
);

-- Observations partagées : espèce, jour et État. Jamais de coordonnées ni de nom de lieu.
create table if not exists public.shared_sightings (
  user_id uuid not null references public.profiles (id) on delete cascade,
  id text not null check (char_length(id) between 1 and 40),
  animal_id smallint not null check (animal_id between 1 and 999),
  observed_on date not null,
  state text check (state in ('NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT')),
  primary key (user_id, id)
);

-- Une amitié = deux lignes (A→B et B→A), créées et supprimées ensemble par les fonctions.
create table if not exists public.friendships (
  user_id uuid not null references public.profiles (id) on delete cascade,
  friend_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id),
  check (user_id <> friend_id)
);

-- Espèces dont on ne partage jamais le lieu (menacées ou inscrites sur une liste de protection).
create table if not exists public.sensitive_species (
  animal_id smallint primary key
);

-- BEGIN SENSITIVE (généré par scripts/gen-supabase-sql.mjs — ne pas modifier à la main)
-- 67 espèces sur 151.
insert into public.sensitive_species (animal_id) values
  (4), (5), (6), (8), (9), (10), (12), (15), (16), (17), (19), (20), (21), (23), (26), (27), (34), 
  (35), (43), (44), (47), (48), (53), (57), (62), (66), (69), (72), (77), (79), (80), (83), (84), (86), 
  (89), (90), (100), (105), (117), (121), (123), (125), (127), (128), (129), (130), (131), (132), 
  (133), (134), (135), (136), (137), (138), (139), (140), (141), (142), (143), (144), (145), (146), 
  (147), (148), (149), (150), (151)
on conflict do nothing;
delete from public.sensitive_species where animal_id not in (4, 5, 6, 8, 9, 10, 12, 15, 16, 17, 19, 20, 21, 23, 26, 27, 34, 35, 43, 44, 47, 48, 53, 57, 62, 66, 69, 72, 77, 79, 80, 83, 84, 86, 89, 90, 100, 105, 117, 121, 123, 125, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151);
-- END SENSITIVE

-- ─── Droits : rien pour « anon », le minimum pour les comptes connectés ─────

revoke all on public.profiles, public.progress, public.shared_sightings, public.friendships, public.sensitive_species from anon, authenticated;
grant select on public.profiles, public.progress, public.shared_sightings, public.friendships, public.sensitive_species to authenticated;
grant update (pseudo) on public.profiles to authenticated; -- le code ami ne se modifie que via une fonction
grant insert, update on public.progress to authenticated;
grant insert, update, delete on public.shared_sightings to authenticated;

alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.shared_sightings enable row level security;
alter table public.friendships enable row level security;
alter table public.sensitive_species enable row level security;

-- ─── Règles RLS ─────────────────────────────────────────────────────────────

drop policy if exists "friendships: mes amitiés" on public.friendships;
create policy "friendships: mes amitiés" on public.friendships
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "profiles: moi et mes amis" on public.profiles;
create policy "profiles: moi et mes amis" on public.profiles
  for select to authenticated using (
    id = (select auth.uid())
    or exists (select 1 from public.friendships f where f.user_id = (select auth.uid()) and f.friend_id = profiles.id)
  );
drop policy if exists "profiles: modifier le mien" on public.profiles;
create policy "profiles: modifier le mien" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

drop policy if exists "progress: moi et mes amis" on public.progress;
create policy "progress: moi et mes amis" on public.progress
  for select to authenticated using (
    user_id = (select auth.uid())
    or exists (select 1 from public.friendships f where f.user_id = (select auth.uid()) and f.friend_id = progress.user_id)
  );
drop policy if exists "progress: créer le mien" on public.progress;
create policy "progress: créer le mien" on public.progress
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "progress: modifier le mien" on public.progress;
create policy "progress: modifier le mien" on public.progress
  for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "sightings: moi et mes amis" on public.shared_sightings;
create policy "sightings: moi et mes amis" on public.shared_sightings
  for select to authenticated using (
    user_id = (select auth.uid())
    or exists (select 1 from public.friendships f where f.user_id = (select auth.uid()) and f.friend_id = shared_sightings.user_id)
  );
drop policy if exists "sightings: créer les miennes" on public.shared_sightings;
create policy "sightings: créer les miennes" on public.shared_sightings
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "sightings: modifier les miennes" on public.shared_sightings;
create policy "sightings: modifier les miennes" on public.shared_sightings
  for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists "sightings: supprimer les miennes" on public.shared_sightings;
create policy "sightings: supprimer les miennes" on public.shared_sightings
  for delete to authenticated using (user_id = (select auth.uid()));

drop policy if exists "sensitive: lecture" on public.sensitive_species;
create policy "sensitive: lecture" on public.sensitive_species
  for select to authenticated using (true);

-- ─── Le lieu des espèces menacées n'est jamais enregistré ───────────────────

create or replace function public.strip_sensitive_location()
returns trigger language plpgsql set search_path = '' as $$
begin
  if exists (select 1 from public.sensitive_species s where s.animal_id = new.animal_id) then
    new.state := null;
  end if;
  return new;
end $$;

drop trigger if exists strip_sensitive_location on public.shared_sightings;
create trigger strip_sensitive_location
  before insert or update on public.shared_sightings
  for each row execute function public.strip_sensitive_location();

-- ─── Fonctions internes ─────────────────────────────────────────────────────

create or replace function public.new_friend_code()
returns text language sql volatile set search_path = '' as $$
  -- 32 symboles et 256 % 32 = 0 : chaque caractère est tiré sans biais.
  select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', (get_byte(uuid_send(gen_random_uuid()), i) % 32) + 1, 1), '')
  from generate_series(0, 7) as i
$$;
revoke all on function public.new_friend_code() from public, anon, authenticated;

-- ─── Fonctions appelées par l'appli ─────────────────────────────────────────
-- « security definer » seulement quand c'est indispensable, avec des contrôles
-- explicites sur auth.uid(). Les autres s'exécutent avec les droits de l'appelant
-- (les règles RLS s'appliquent donc normalement).

create or replace function public.create_profile(p_pseudo text)
returns public.profiles language plpgsql security definer set search_path = '' as $$
declare
  me uuid := auth.uid();
  result public.profiles;
begin
  if me is null then raise exception 'not_authenticated'; end if;
  select * into result from public.profiles where id = me;
  if found then return result; end if;
  loop
    begin
      insert into public.profiles (id, pseudo, friend_code)
      values (me, btrim(p_pseudo), public.new_friend_code())
      returning * into result;
      exit;
    exception when unique_violation then
      -- Code déjà pris (très improbable) : on en tire un autre.
    end;
  end loop;
  insert into public.progress (user_id) values (me) on conflict do nothing;
  return result;
end $$;

create or replace function public.regenerate_friend_code()
returns text language plpgsql security definer set search_path = '' as $$
declare
  me uuid := auth.uid();
  code text;
begin
  if me is null then raise exception 'not_authenticated'; end if;
  loop
    begin
      update public.profiles set friend_code = public.new_friend_code() where id = me returning friend_code into code;
      exit;
    exception when unique_violation then
    end;
  end loop;
  if code is null then raise exception 'no_profile'; end if;
  return code;
end $$;

create or replace function public.add_friend(p_code text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  me uuid := auth.uid();
  other public.profiles;
begin
  if me is null then raise exception 'not_authenticated'; end if;
  if not exists (select 1 from public.profiles where id = me) then raise exception 'no_profile'; end if;
  select * into other from public.profiles where friend_code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'));
  if not found then raise exception 'code_not_found'; end if;
  if other.id = me then raise exception 'own_code'; end if;
  if (select count(*) from public.friendships where user_id = me) >= 200 then raise exception 'too_many_friends'; end if;
  insert into public.friendships (user_id, friend_id) values (me, other.id), (other.id, me) on conflict do nothing;
  return jsonb_build_object('id', other.id, 'pseudo', other.pseudo);
end $$;

create or replace function public.remove_friend(p_friend uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not_authenticated'; end if;
  delete from public.friendships
  where (user_id = me and friend_id = p_friend) or (user_id = p_friend and friend_id = me);
end $$;

create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = '' as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not_authenticated'; end if;
  -- Supprime le compte ; profil, progression, observations et amitiés suivent (on delete cascade).
  delete from auth.users where id = me;
end $$;

create or replace function public.set_pseudo(p_pseudo text)
returns void language sql security invoker set search_path = '' as $$
  update public.profiles set pseudo = btrim(p_pseudo) where id = auth.uid();
$$;

create or replace function public.get_my_profile()
returns jsonb language sql stable security invoker set search_path = '' as $$
  select jsonb_build_object('id', p.id, 'pseudo', p.pseudo, 'friend_code', p.friend_code)
  from public.profiles p where p.id = auth.uid();
$$;

create or replace function public.get_friends()
returns jsonb language sql stable security invoker set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', p.id, 'pseudo', p.pseudo, 'level', coalesce(g.level, 1), 'xp', coalesce(g.xp, 0),
    'species', coalesce(cardinality(g.discovered), 0), 'badges', coalesce(cardinality(g.badges), 0),
    'updated_at', g.updated_at
  ) order by coalesce(g.xp, 0) desc, p.pseudo), '[]'::jsonb)
  from public.friendships f
  join public.profiles p on p.id = f.friend_id
  left join public.progress g on g.user_id = p.id
  where f.user_id = auth.uid();
$$;

create or replace function public.get_friend(p_friend uuid)
returns jsonb language sql stable security invoker set search_path = '' as $$
  -- Les règles RLS garantissent qu'on ne lit que ses amis (ou soi-même).
  select jsonb_build_object(
    'id', p.id, 'pseudo', p.pseudo,
    'level', coalesce(g.level, 1), 'xp', coalesce(g.xp, 0),
    'discovered', coalesce(to_jsonb(g.discovered), '[]'::jsonb),
    'badges', coalesce(to_jsonb(g.badges), '[]'::jsonb),
    'sightings_count', coalesce(g.sightings_count, 0), 'updated_at', g.updated_at,
    'sightings', coalesce((
      select jsonb_agg(jsonb_build_object('animal_id', s.animal_id, 'observed_on', s.observed_on, 'state', s.state)
        order by s.observed_on desc)
      from (select * from public.shared_sightings where user_id = p.id order by observed_on desc limit 50) s
    ), '[]'::jsonb)
  )
  from public.profiles p left join public.progress g on g.user_id = p.id
  where p.id = p_friend;
$$;

create or replace function public.sync_progress(p_xp integer, p_level integer, p_discovered smallint[], p_badges text[], p_sightings_count integer)
returns void language sql security invoker set search_path = '' as $$
  insert into public.progress (user_id, xp, level, discovered, badges, sightings_count, updated_at)
  values (auth.uid(), p_xp, p_level, p_discovered, p_badges, p_sightings_count, now())
  on conflict (user_id) do update set
    xp = excluded.xp, level = excluded.level, discovered = excluded.discovered,
    badges = excluded.badges, sightings_count = excluded.sightings_count, updated_at = now();
$$;

-- Remplace mes observations partagées par la liste envoyée (au plus 500).
create or replace function public.sync_sightings(p_sightings jsonb)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not_authenticated'; end if;
  if jsonb_typeof(p_sightings) <> 'array' or jsonb_array_length(p_sightings) > 500 then raise exception 'invalid_payload'; end if;
  delete from public.shared_sightings
  where user_id = me and id not in (select x ->> 'id' from jsonb_array_elements(p_sightings) x);
  insert into public.shared_sightings (user_id, id, animal_id, observed_on, state)
  select me, x ->> 'id', (x ->> 'animal_id')::smallint, (x ->> 'observed_on')::date, nullif(x ->> 'state', '')
  from jsonb_array_elements(p_sightings) x
  on conflict (user_id, id) do update set
    animal_id = excluded.animal_id, observed_on = excluded.observed_on, state = excluded.state;
end $$;

-- Seuls les comptes connectés peuvent appeler les fonctions publiques.
revoke all on function public.create_profile(text), public.regenerate_friend_code(), public.add_friend(text),
  public.remove_friend(uuid), public.delete_my_account(), public.set_pseudo(text), public.get_my_profile(),
  public.get_friends(), public.get_friend(uuid), public.sync_progress(integer, integer, smallint[], text[], integer),
  public.sync_sightings(jsonb), public.strip_sensitive_location()
  from public, anon;
grant execute on function public.create_profile(text), public.regenerate_friend_code(), public.add_friend(text),
  public.remove_friend(uuid), public.delete_my_account(), public.set_pseudo(text), public.get_my_profile(),
  public.get_friends(), public.get_friend(uuid), public.sync_progress(integer, integer, smallint[], text[], integer),
  public.sync_sightings(jsonb)
  to authenticated;
