-- ============================================================
-- Ebeltoft Marineforening — databaseskema
-- Se docs/product-design-document.md afsnit 4 for baggrund.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ---------- Medlemmer ----------
create table members (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid references auth.users (id),
  name text not null,
  email text unique,
  phone text,
  member_since date default now(),
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz default now()
);

-- ---------- Roller (én bruger kan have flere roller) ----------
create table user_roles (
  id uuid primary key default uuid_generate_v4(),
  member_id uuid references members (id) on delete cascade,
  role text not null check (
    role in ('member', 'volunteer_coordinator', 'editor', 'treasurer', 'board_member', 'admin')
  ),
  created_at timestamptz default now(),
  unique (member_id, role)
);

-- ---------- Arrangementer og frivilligopgaver ----------
-- 'type' skelner mellem et arrangement og en frivilligopgave, men deler
-- samme tabel og dermed samme tilmeldings-motor (se registrations).
create table events (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('event', 'volunteer')),
  title text not null,
  description text,
  event_date date not null,
  event_time time,
  location text,
  capacity int, -- antal pladser (arrangement) eller antal frivillige (opgave)
  price numeric(10, 2) default 0,
  status text not null default 'published' check (status in ('draft', 'published', 'cancelled')),
  created_by uuid references members (id),
  created_at timestamptz default now()
);

-- ---------- Tilmeldinger (arrangementer + frivillig — hybridmodel) ----------
create table registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events (id) on delete cascade,
  member_id uuid references members (id), -- null hvis registreret manuelt for en ikke-oprettet bruger
  contact_name text, -- bruges når der ikke er en member_id (fx telefonisk tilmelding)
  contact_phone text,
  contact_email text,
  guests_count int not null default 1,
  meal_choice text,
  note text,
  source text not null default 'digital' check (source in ('digital', 'phone', 'paper', 'email')),
  status text not null default 'confirmed' check (status in ('confirmed', 'waitlist', 'cancelled')),
  registered_by uuid references members (id), -- bestyrelsesmedlem ved manuel registrering
  created_at timestamptz default now()
);

-- ---------- Betalinger ----------
create table payments (
  id uuid primary key default uuid_generate_v4(),
  member_id uuid references members (id),
  type text not null check (type in ('contingent', 'event', 'donation')),
  related_event_id uuid references events (id),
  amount numeric(10, 2) not null,
  method text default 'mobilepay',
  status text not null default 'pending' check (status in ('pending', 'paid', 'refunded')),
  receipt_sent_at timestamptz,
  created_at timestamptz default now()
);

-- ---------- Dokumenter ----------
create table documents (
  id uuid primary key default uuid_generate_v4(),
  category text not null check (
    category in ('referat', 'vedtaegter', 'historie', 'fond', 'jubilaeum', 'andet')
  ),
  title text not null,
  file_url text not null,
  visible_to_role text not null default 'member' check (
    visible_to_role in ('public', 'member', 'board_member', 'admin')
  ),
  created_at timestamptz default now()
);

-- ---------- Nyheder ----------
create table news (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  body text not null,
  author_id uuid references members (id),
  published_at timestamptz,
  created_at timestamptz default now()
);

create index on registrations (event_id);
create index on registrations (member_id);
create index on payments (member_id);
create index on user_roles (member_id);
