# Tests des règles de sécurité (RLS)

Ces tests vérifient sur un vrai PostgreSQL (16) que `supabase/anidex.sql` protège bien les données :
- chacun ne modifie que ses propres données ;
- seuls les amis lisent la progression les uns des autres ;
- une personne non connectée n'a accès à rien ;
- aucune position GPS n'est stockée, et aucun lieu pour les espèces menacées.

```bash
# 1. PostgreSQL local temporaire (port 54329)
mkdir -p /tmp/anidex-pg && chown postgres /tmp/anidex-pg
runuser -u postgres -- /usr/lib/postgresql/16/bin/initdb -D /tmp/anidex-pg/data -A trust -U postgres
runuser -u postgres -- /usr/lib/postgresql/16/bin/pg_ctl -D /tmp/anidex-pg/data \
  -o "-p 54329 -k /tmp/anidex-pg -c listen_addresses=''" -l /tmp/anidex-pg/log start

# 2. Base de test : imitation de Supabase, puis le script de l'appli
psql -h /tmp/anidex-pg -p 54329 -U postgres -c "drop database if exists t" -c "create database t"
psql -h /tmp/anidex-pg -p 54329 -U postgres -d t -f supabase/tests/supabase_stub.sql
psql -h /tmp/anidex-pg -p 54329 -U postgres -d t -f supabase/anidex.sql

# 3. Tests
python3 supabase/tests/rls_test.py
```
