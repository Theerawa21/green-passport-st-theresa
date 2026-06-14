# Supabase + Vercel Setup

คู่มือนี้ย้ายระบบ Green Passport - St. Theresa Zero Waste จาก Google Apps Script ไปสู่สถาปัตยกรรมที่เสถียรกว่า:

- Vercel: โฮสต์เว็บแอป
- Supabase: ฐานข้อมูล Postgres, Auth, Storage และ API
- GitHub: เก็บโค้ดและเชื่อม deploy

## ข้อมูลโปรเจกต์ Supabase

Project ref: `ldkvwnyogbmmcrwphwqo`

Project URL:

```text
https://ldkvwnyogbmmcrwphwqo.supabase.co
```

## ขั้นตอนที่ 1: สร้างตารางใน Supabase

1. เปิด Supabase Dashboard
2. เข้าโปรเจกต์ `ldkvwnyogbmmcrwphwqo`
3. ไปที่ SQL Editor
4. เปิดไฟล์ `supabase/schema.sql` ใน repo นี้
5. คัดลอก SQL ทั้งหมดไปวางใน SQL Editor
6. กด Run

ไฟล์ schema:

```text
supabase/schema.sql
```

## ขั้นตอนที่ 2: เอา anon public key

1. ไปที่ Project Settings
2. เลือก API
3. คัดลอก `anon public` key
4. นำไปใส่ใน Vercel Environment Variables

## ขั้นตอนที่ 3: ตั้งค่า Environment Variables บน Vercel

เพิ่มค่าตามนี้ใน Vercel:

```text
VITE_SUPABASE_URL=https://ldkvwnyogbmmcrwphwqo.supabase.co
VITE_SUPABASE_ANON_KEY=ค่า anon public key จาก Supabase
```

ดูตัวอย่างในไฟล์:

```text
.env.example
```

## ขั้นตอนที่ 4: เชื่อม GitHub กับ Vercel

1. เปิด Vercel Dashboard
2. กด Add New Project
3. เลือก repo `Theerawa21/green-passport-st-theresa`
4. ใส่ Environment Variables ตามขั้นตอนที่ 3
5. กด Deploy

## ตารางหลักที่สร้างใน Supabase

- `households`
- `waste_records`
- `game_scores`
- `carbon_factors`
- `advice_rules`
- `export_reports`

## ความปลอดภัยเบื้องต้น

ไฟล์ `schema.sql` เปิด Row Level Security แล้ว:

- ผู้ใช้ทั่วไปส่งข้อมูลขยะและคะแนนเกมได้
- ผู้ใช้ทั่วไปอ่านเฉพาะข้อมูลอ้างอิง เช่น CarbonFactors และ AdviceRules
- ข้อมูลดิบของนักเรียนไม่เปิดให้อ่านแบบสาธารณะ
- ครูหรือผู้ดูแลที่ login แล้วจึงดูและตรวจข้อมูลได้

## สิ่งที่ต้องทำต่อในโค้ดเว็บ

หลังตั้งค่า Supabase แล้ว ต้องปรับ frontend ให้ใช้ Supabase แทน Google Apps Script:

```js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

จากนั้นเปลี่ยนการบันทึกข้อมูลเป็น:

```js
await supabase.from('waste_records').insert(payload)
```

และอ่าน dashboard ด้วย RPC:

```js
await supabase.rpc('get_public_dashboard')
```

## หมายเหตุ

อย่าใส่ `SUPABASE_SERVICE_ROLE_KEY` ในโค้ด frontend หรือ GitHub Pages เพราะเป็น key ระดับสูง ควรใช้เฉพาะฝั่ง server เท่านั้น
