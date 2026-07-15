create extension if not exists pgcrypto;

create table if not exists public.trip_stops (
  id uuid primary key default gen_random_uuid(),
  trip_id text not null,
  position integer not null default 0,
  day_number integer,
  stop_date date,
  location_name text not null,
  latitude double precision not null,
  longitude double precision not null,
  journal_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trip_photos (
  id uuid primary key default gen_random_uuid(),
  trip_id text not null,
  stop_id uuid not null references public.trip_stops(id) on delete cascade,
  storage_path text not null,
  public_url text not null,
  caption text not null default '',
  created_at timestamptz not null default now()
);

alter table public.trip_stops enable row level security;
alter table public.trip_photos enable row level security;

create policy "public read trip stops" on public.trip_stops for select using (true);
create policy "public add trip stops" on public.trip_stops for insert with check (true);
create policy "public edit trip stops" on public.trip_stops for update using (true) with check (true);
create policy "public delete trip stops" on public.trip_stops for delete using (true);
create policy "public read trip photos" on public.trip_photos for select using (true);
create policy "public add trip photos" on public.trip_photos for insert with check (true);
create policy "public edit trip photos" on public.trip_photos for update using (true) with check (true);
create policy "public delete trip photos" on public.trip_photos for delete using (true);

insert into storage.buckets (id, name, public)
values ('trip-photos', 'trip-photos', true)
on conflict (id) do update set public = true;

create policy "public read trip photo files" on storage.objects for select using (bucket_id = 'trip-photos');
create policy "public upload trip photo files" on storage.objects for insert with check (bucket_id = 'trip-photos');
create policy "public update trip photo files" on storage.objects for update using (bucket_id = 'trip-photos');
create policy "public delete trip photo files" on storage.objects for delete using (bucket_id = 'trip-photos');
