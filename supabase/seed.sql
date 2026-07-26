-- Eksempeldata til lokal udvikling og test — IKKE til produktion.

insert into members (name, email, phone, status) values
  ('Jens Holm', 'jens.holm@eksempel.dk', '21000001', 'active'),
  ('Anna Lund', 'anna.lund@eksempel.dk', '21000002', 'active'),
  ('Birthe Sørensen', 'birthe.sorensen@eksempel.dk', '21000003', 'active');

insert into user_roles (member_id, role)
  select id, 'treasurer' from members where email = 'anna.lund@eksempel.dk';

insert into events (type, title, description, event_date, event_time, location, capacity, price, status) values
  ('event', 'Kammeratskabsaften', 'Hyggeligt samvær med let bespisning.', '2026-06-25', '18:30', 'Marinestuen', 40, 75.00, 'published'),
  ('volunteer', 'Standerhejsning', 'Praktisk hjælp med borde, stole og oprydning.', '2026-07-04', '10:00', 'Havnen', 4, 0, 'published');

insert into documents (category, title, file_url, visible_to_role) values
  ('referat', 'Bestyrelsesmøde — 14. juni 2026', 'https://example.com/referat-2026-06-14.pdf', 'member'),
  ('vedtaegter', 'Vedtægter (revideret 2025)', 'https://example.com/vedtaegter-2025.pdf', 'public');
