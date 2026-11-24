-- Imitation minimale de l'environnement Supabase pour tester supabase/anidex.sql en local.
-- Ne pas exécuter sur un vrai projet Supabase (il possède déjà tout cela).
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
end $$;
create schema auth;
create table auth.users (id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;
grant usage on schema auth to anon, authenticated;
grant execute on function auth.uid() to anon, authenticated;
grant usage on schema public to anon, authenticated;
-- Supabase donne par défaut tous les droits sur les nouvelles tables à anon/authenticated :
alter default privileges in schema public grant all on tables to anon, authenticated;
alter default privileges in schema public grant all on functions to anon, authenticated;
insert into auth.users values ('aaaaaaaa-0000-0000-0000-00000000000a'), ('bbbbbbbb-0000-0000-0000-00000000000b'), ('cccccccc-0000-0000-0000-00000000000c'), ('dddddddd-0000-0000-0000-00000000000d');
