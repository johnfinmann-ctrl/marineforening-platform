-- ============================================================
-- Row Level Security — implementerer rollemodellen fra
-- docs/product-design-document.md afsnit 4.1
-- ============================================================

alter table members enable row level security;
alter table user_roles enable row level security;
alter table events enable row level security;
alter table registrations enable row level security;
alter table payments enable row level security;
alter table documents enable row level security;
alter table news enable row level security;

-- Hjælpefunktion: har den indloggede bruger en given rolle?
create or replace function has_role(role_name text)
returns boolean
language sql
security definer
as $$
  select exists (
    select 1
    from user_roles ur
    join members m on m.id = ur.member_id
    where m.auth_user_id = auth.uid()
      and ur.role = role_name
  );
$$;

-- ---------- members ----------
create policy "Medlemmer kan se og redigere egne oplysninger"
  on members for select using (auth_user_id = auth.uid() or has_role('board_member') or has_role('admin'));
create policy "Medlemmer kan opdatere egne oplysninger"
  on members for update using (auth_user_id = auth.uid());
create policy "Bestyrelse kan administrere medlemmer"
  on members for all using (has_role('board_member') or has_role('admin'));

-- ---------- events (offentligt læsbare, kun redigerbare af koordinator/bestyrelse) ----------
create policy "Alle kan se offentliggjorte arrangementer"
  on events for select using (status = 'published' or has_role('board_member') or has_role('admin'));
create policy "Frivillig-koordinator og bestyrelse kan oprette/redigere"
  on events for insert with check (has_role('volunteer_coordinator') or has_role('board_member') or has_role('admin'));
create policy "Frivillig-koordinator og bestyrelse kan opdatere"
  on events for update using (has_role('volunteer_coordinator') or has_role('board_member') or has_role('admin'));

-- ---------- registrations ----------
create policy "Medlem kan se egne tilmeldinger"
  on registrations for select using (
    member_id in (select id from members where auth_user_id = auth.uid())
    or has_role('board_member') or has_role('volunteer_coordinator') or has_role('admin')
  );
create policy "Alle kan tilmelde sig (digitalt)"
  on registrations for insert with check (true);
create policy "Bestyrelsen kan registrere tilmeldinger manuelt (hybridmodel)"
  on registrations for insert with check (has_role('board_member') or has_role('admin'));
create policy "Medlem kan afmelde egen tilmelding"
  on registrations for update using (
    member_id in (select id from members where auth_user_id = auth.uid())
    or has_role('board_member') or has_role('admin')
  );

-- ---------- payments ----------
create policy "Medlem kan se egne betalinger"
  on payments for select using (
    member_id in (select id from members where auth_user_id = auth.uid())
    or has_role('treasurer') or has_role('board_member') or has_role('admin')
  );
create policy "Kasserer administrerer betalinger"
  on payments for all using (has_role('treasurer') or has_role('board_member') or has_role('admin'));

-- ---------- documents ----------
create policy "Adgang styres af visible_to_role"
  on documents for select using (
    visible_to_role = 'public'
    or (visible_to_role = 'member' and auth.uid() is not null)
    or ((visible_to_role in ('board_member', 'admin')) and (has_role('board_member') or has_role('admin')))
  );
create policy "Bestyrelse og admin kan uploade dokumenter"
  on documents for insert with check (has_role('board_member') or has_role('admin'));

-- ---------- news ----------
create policy "Alle kan læse offentliggjorte nyheder"
  on news for select using (published_at is not null or has_role('editor') or has_role('board_member') or has_role('admin'));
create policy "Redaktør og bestyrelse kan skrive nyheder"
  on news for insert with check (has_role('editor') or has_role('board_member') or has_role('admin'));
