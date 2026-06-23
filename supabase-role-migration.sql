-- Run this once if you already executed the older schema that used role = 'member'.

update public.profiles
set role = 'customer'
where role = 'member';

alter table public.profiles
alter column role set default 'customer';

alter table public.profiles
drop constraint if exists profiles_role_check;

alter table public.profiles
add constraint profiles_role_check check (role in ('admin', 'customer'));

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
  on conflict (id) do update
  set
    full_name = excluded.full_name,
    email = excluded.email,
    role = excluded.role;

  return new;
end;
$$;
