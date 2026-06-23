create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  total_points integer not null default 0 check (total_points >= 0),
  tier text not null default 'Bronze' check (tier in ('Bronze', 'Silver', 'Gold', 'Platinum')),
  created_at timestamp with time zone not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  code text,
  name text not null,
  description text,
  category text,
  brand text,
  price numeric not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  customer_id text unique,
  name text not null,
  email text,
  phone text,
  loyalty text not null default 'Bronze' check (loyalty in ('Bronze', 'Silver', 'Gold', 'Platinum')),
  created_at timestamp with time zone not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  total_original_price numeric not null default 0 check (total_original_price >= 0),
  discount_applied numeric not null default 0 check (discount_applied >= 0),
  total_final_price numeric not null default 0 check (total_final_price >= 0),
  points_earned integer not null default 0 check (points_earned >= 0),
  status text not null default 'pending',
  created_at timestamp with time zone not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity >= 1),
  price_at_purchase numeric not null check (price_at_purchase >= 0),
  created_at timestamp with time zone not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create or replace function public.get_my_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.get_tier_for_points(points integer)
returns text
language sql
immutable
as $$
  select case
    when points > 3000 then 'Platinum'
    when points >= 1501 then 'Gold'
    when points >= 501 then 'Silver'
    else 'Bronze'
  end
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, total_points, tier)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    case
      when new.raw_user_meta_data->>'role' in ('admin', 'customer')
        then new.raw_user_meta_data->>'role'
      else 'customer'
    end,
    0,
    'Bronze'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.sync_profile_tier()
returns trigger
language plpgsql
as $$
begin
  new.tier := public.get_tier_for_points(new.total_points);
  return new;
end;
$$;

drop trigger if exists before_profile_points_update on public.profiles;
create trigger before_profile_points_update
before insert or update of total_points on public.profiles
for each row execute function public.sync_profile_tier();

create or replace function public.award_order_points()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set total_points = total_points + new.points_earned
  where id = new.user_id;

  return new;
end;
$$;

drop trigger if exists after_order_insert_award_points on public.orders;
create trigger after_order_insert_award_points
after insert on public.orders
for each row execute function public.award_order_points();

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
using (auth.uid() = id or public.get_my_role() = 'admin');

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles for update
using (auth.uid() = id or public.get_my_role() = 'admin')
with check (auth.uid() = id or public.get_my_role() = 'admin');

drop policy if exists "profiles_delete_admin" on public.profiles;
create policy "profiles_delete_admin"
on public.profiles for delete
using (public.get_my_role() = 'admin');

drop policy if exists "products_select_all" on public.products;
create policy "products_select_all"
on public.products for select
using (true);

drop policy if exists "products_insert_admin" on public.products;
create policy "products_insert_admin"
on public.products for insert
with check (public.get_my_role() = 'admin');

drop policy if exists "products_update_admin" on public.products;
create policy "products_update_admin"
on public.products for update
using (public.get_my_role() = 'admin')
with check (public.get_my_role() = 'admin');

drop policy if exists "products_delete_admin" on public.products;
create policy "products_delete_admin"
on public.products for delete
using (public.get_my_role() = 'admin');

drop policy if exists "customers_select_admin" on public.customers;
create policy "customers_select_admin"
on public.customers for select
using (public.get_my_role() = 'admin');

drop policy if exists "customers_insert_admin" on public.customers;
create policy "customers_insert_admin"
on public.customers for insert
with check (public.get_my_role() = 'admin');

drop policy if exists "customers_update_admin" on public.customers;
create policy "customers_update_admin"
on public.customers for update
using (public.get_my_role() = 'admin')
with check (public.get_my_role() = 'admin');

drop policy if exists "customers_delete_admin" on public.customers;
create policy "customers_delete_admin"
on public.customers for delete
using (public.get_my_role() = 'admin');

drop policy if exists "orders_select_own_or_admin" on public.orders;
create policy "orders_select_own_or_admin"
on public.orders for select
using (user_id = auth.uid() or public.get_my_role() = 'admin');

drop policy if exists "orders_insert_own_or_admin" on public.orders;
create policy "orders_insert_own_or_admin"
on public.orders for insert
with check (user_id = auth.uid() or public.get_my_role() = 'admin');

drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin"
on public.orders for update
using (public.get_my_role() = 'admin')
with check (public.get_my_role() = 'admin');

drop policy if exists "orders_delete_admin" on public.orders;
create policy "orders_delete_admin"
on public.orders for delete
using (public.get_my_role() = 'admin');

drop policy if exists "order_items_select_own_or_admin" on public.order_items;
create policy "order_items_select_own_or_admin"
on public.order_items for select
using (
  public.get_my_role() = 'admin'
  or exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "order_items_insert_own_or_admin" on public.order_items;
create policy "order_items_insert_own_or_admin"
on public.order_items for insert
with check (
  public.get_my_role() = 'admin'
  or exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "order_items_update_admin" on public.order_items;
create policy "order_items_update_admin"
on public.order_items for update
using (public.get_my_role() = 'admin')
with check (public.get_my_role() = 'admin');

drop policy if exists "order_items_delete_admin" on public.order_items;
create policy "order_items_delete_admin"
on public.order_items for delete
using (public.get_my_role() = 'admin');

-- Register now sends role metadata as either 'admin' or 'customer'.
-- For production apps, avoid allowing public admin self-registration.
