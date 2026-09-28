create table if not exists public.posts (
  slug text primary key,
  title text not null,
  "metaDescription" text not null default '',
  category text not null,
  excerpt text not null default '',
  "date" date not null default current_date,
  "readTime" text not null default '1 min read',
  content jsonb not null default '[]'::jsonb,
  "calcRelated" text,
  "calcRelatedLabel" text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  "featuredImage" text,
  "seoTitle" text,
  "seoMetaDescription" text,
  "calculatorCategories" jsonb,
  tags jsonb,
  faqs jsonb,
  "updatedAt" timestamptz default now()
);

grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;

alter table public.posts enable row level security;

drop policy if exists "public_read_published_posts" on public.posts;
create policy "public_read_published_posts"
  on public.posts
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "authenticated_admin_read_posts" on public.posts;
create policy "authenticated_admin_read_posts"
  on public.posts
  for select
  to authenticated
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated_admin_insert_posts" on public.posts;
create policy "authenticated_admin_insert_posts"
  on public.posts
  for insert
  to authenticated
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated_admin_update_posts" on public.posts;
create policy "authenticated_admin_update_posts"
  on public.posts
  for update
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated_admin_delete_posts" on public.posts;
create policy "authenticated_admin_delete_posts"
  on public.posts
  for delete
  to authenticated
  using (auth.role() = 'authenticated');

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1
       from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'posts'
     ) then
    alter publication supabase_realtime add table public.posts;
  end if;
end $$;
