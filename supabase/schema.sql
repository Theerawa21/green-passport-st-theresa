-- Green Passport - St. Theresa Zero Waste
-- Supabase schema for a stable Vercel + Supabase version
-- Project ref: ldkvwnyogbmmcrwphwqo

create extension if not exists pgcrypto;

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  household_name text not null,
  student_name text not null,
  class_name text not null,
  student_id text,
  created_at timestamptz not null default now(),
  unique (household_name, student_id)
);

create table if not exists public.carbon_factors (
  activity_code text primary key,
  activity_name text not null,
  unit text not null,
  ef numeric(12,4) not null default 0,
  source text,
  note text,
  updated_at timestamptz not null default now()
);

create table if not exists public.waste_records (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete set null,
  submitted_at timestamptz not null default now(),
  report_month text not null,
  student_name text not null,
  class_name text not null,
  student_id text,
  household_name text not null,
  general_waste_kg numeric(10,2) not null default 0,
  recycle_waste_kg numeric(10,2) not null default 0,
  organic_waste_kg numeric(10,2) not null default 0,
  hazardous_waste_amount numeric(10,2) not null default 0,
  paper_kg numeric(10,2) not null default 0,
  plastic_bottle_kg numeric(10,2) not null default 0,
  can_kg numeric(10,2) not null default 0,
  aluminum_kg numeric(10,2) not null default 0,
  steel_can_kg numeric(10,2) not null default 0,
  scrap_iron_kg numeric(10,2) not null default 0,
  glass_bottle_kg numeric(10,2) not null default 0,
  compost_food_kg numeric(10,2) not null default 0,
  bio_extract_kg numeric(10,2) not null default 0,
  feed_animals_kg numeric(10,2) not null default 0,
  reduce_plastic_bag_times integer not null default 0,
  carry_bottle_times integer not null default 0,
  use_lunch_box_times integer not null default 0,
  refuse_straw_times integer not null default 0,
  carry_cloth_bag_times integer not null default 0,
  repair_items_times integer not null default 0,
  donate_items_times integer not null default 0,
  dispose_batteries_amount integer not null default 0,
  dispose_bulbs_amount integer not null default 0,
  dispose_expired_medicine_amount integer not null default 0,
  total_co2e numeric(12,2) not null default 0,
  evidence_url text,
  video_url text,
  review_status text not null default 'pending',
  teacher_comment text,
  reviewed_by text,
  reviewed_at timestamptz,
  consent_status text not null default 'school_activity_only'
);

create table if not exists public.game_scores (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  class_name text not null,
  student_id text,
  team_name text,
  total_score integer not null default 0,
  total_stars integer not null default 0,
  player_level text,
  latest_stage text,
  badges text,
  certificate_status text
);

create table if not exists public.advice_rules (
  rule_code text primary key,
  condition_text text not null,
  advice_for_student text not null,
  advice_for_parent text,
  priority integer not null default 100,
  active boolean not null default true
);

create table if not exists public.export_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  report_type text not null,
  requested_by text,
  row_count integer not null default 0,
  status text not null default 'created',
  note text
);

create index if not exists idx_waste_records_month on public.waste_records(report_month);
create index if not exists idx_waste_records_class on public.waste_records(class_name);
create index if not exists idx_waste_records_household on public.waste_records(household_name);
create index if not exists idx_waste_records_review_status on public.waste_records(review_status);
create index if not exists idx_game_scores_class on public.game_scores(class_name);
create index if not exists idx_game_scores_total_score on public.game_scores(total_score desc);

alter table public.households enable row level security;
alter table public.carbon_factors enable row level security;
alter table public.waste_records enable row level security;
alter table public.game_scores enable row level security;
alter table public.advice_rules enable row level security;
alter table public.export_reports enable row level security;

-- Public student/parent forms can submit records and game scores.
create policy "anon_insert_waste_records" on public.waste_records
  for insert to anon with check (true);

create policy "anon_insert_game_scores" on public.game_scores
  for insert to anon with check (true);

-- Public pages can read non-sensitive reference data.
create policy "public_read_carbon_factors" on public.carbon_factors
  for select to anon, authenticated using (true);

create policy "public_read_active_advice_rules" on public.advice_rules
  for select to anon, authenticated using (active = true);

-- Authenticated teachers/admins can review records.
create policy "authenticated_read_waste_records" on public.waste_records
  for select to authenticated using (true);

create policy "authenticated_update_reviews" on public.waste_records
  for update to authenticated using (true) with check (true);

create policy "authenticated_read_game_scores" on public.game_scores
  for select to authenticated using (true);

create policy "authenticated_manage_exports" on public.export_reports
  for all to authenticated using (true) with check (true);

create or replace function public.get_public_dashboard()
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'recordCount', count(*),
    'householdCount', count(distinct household_name),
    'totalWasteKg', coalesce(sum(general_waste_kg + recycle_waste_kg + organic_waste_kg + hazardous_waste_amount), 0),
    'managedWasteKg', coalesce(sum(paper_kg + plastic_bottle_kg + can_kg + aluminum_kg + steel_can_kg + scrap_iron_kg + glass_bottle_kg + compost_food_kg + bio_extract_kg + feed_animals_kg), 0),
    'totalCO2e', coalesce(sum(total_co2e), 0)
  )
  from public.waste_records;
$$;

revoke all on function public.get_public_dashboard() from public;
grant execute on function public.get_public_dashboard() to anon, authenticated;

insert into public.carbon_factors(activity_code, activity_name, unit, ef, source, note) values
  ('PAPER_KG', 'ขายกระดาษ', 'kg', 0.92, 'School/IPCC proxy', 'ปรับค่า EF ได้'),
  ('PLASTIC_BOTTLE_KG', 'ขายขวดพลาสติก', 'kg', 1.45, 'School/IPCC proxy', 'รีไซเคิลพลาสติก'),
  ('CAN_KG', 'ขายกระป๋อง', 'kg', 1.02, 'School/IPCC proxy', 'กระป๋องโลหะทั่วไป'),
  ('ALUMINUM_KG', 'ขายอะลูมิเนียม', 'kg', 9.13, 'School/IPCC proxy', 'ผลลดคาร์บอนสูง'),
  ('COMPOST_FOOD_KG', 'หมักเศษอาหารทำปุ๋ย', 'kg', 0.25, 'IPCC proxy', 'ลดเศษอาหารฝังกลบ')
on conflict (activity_code) do update set
  activity_name = excluded.activity_name,
  unit = excluded.unit,
  ef = excluded.ef,
  source = excluded.source,
  note = excluded.note,
  updated_at = now();

insert into public.advice_rules(rule_code, condition_text, advice_for_student, advice_for_parent, priority, active) values
  ('GENERAL_HIGH', 'general_waste_kg > 8', 'ลดขยะทั่วไปด้วยกล่องข้าว แก้วน้ำ และถุงผ้าส่วนตัว', 'ช่วยกันเตรียมชุดพกพาลดขยะก่อนออกจากบ้าน', 1, true),
  ('ORGANIC_HIGH', 'organic_waste_kg > 5', 'แยกเศษอาหารไปทำปุ๋ย น้ำหมัก หรืออาหารสัตว์', 'ตั้งถังเศษอาหารพร้อมป้ายวันที่', 2, true),
  ('RECYCLE_LOW', 'recycle_waste_kg < 3', 'ตรวจขวด กระดาษ กระป๋อง และแก้วก่อนทิ้งลงถังทั่วไป', 'จัดมุมรีไซเคิลเล็ก ๆ ที่บ้าน', 3, true)
on conflict (rule_code) do update set
  condition_text = excluded.condition_text,
  advice_for_student = excluded.advice_for_student,
  advice_for_parent = excluded.advice_for_parent,
  priority = excluded.priority,
  active = excluded.active;
