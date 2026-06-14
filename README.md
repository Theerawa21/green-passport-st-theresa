# Green Passport - St. Theresa Zero Waste

ระบบเว็บแอปภาษาไทยสำหรับบันทึกข้อมูลการจัดการขยะ คำนวณการลดคาร์บอน และใช้ประกอบโครงการนวัตกรรมดิจิทัลของโรงเรียนเซนต์เทเรซา

## ลิงก์สำคัญ

- หน้า Repository: https://github.com/Theerawa21/green-passport-st-theresa
- หน้า GitHub Pages หลังเปิดใช้งาน: https://theerawa21.github.io/green-passport-st-theresa/
- Google Sheets ฐานข้อมูล: https://docs.google.com/spreadsheets/d/1CB501XSK9SOA-OsGdDIYqPjxEoUYitKOFKlbpA4yHJ4/edit?usp=sharing
- หน้าแก้ README: https://github.com/Theerawa21/green-passport-st-theresa/edit/main/README.md

## ไฟล์ที่ควรเพิ่มใน Repository

- `Index.html` หน้าเว็บหลักของระบบ
- `Code.gs` โค้ด Google Apps Script สำหรับเชื่อม Google Sheets
- `README.md` คำอธิบาย วิธีติดตั้ง และลิงก์สำคัญ

## วิธีติดตั้งบน Google Apps Script

1. เปิด Google Sheets ฐานข้อมูลจากลิงก์ด้านบน
2. ไปที่ Extensions > Apps Script
3. สร้างไฟล์ `Code.gs` แล้ววางโค้ด backend
4. สร้างไฟล์ HTML ชื่อ `Index` แล้ววางโค้ดหน้าเว็บจาก `Index.html`
5. กด Run ฟังก์ชัน `setupGreenPassport()` หนึ่งครั้ง
6. ไปที่ Deploy > New deployment > Web app
7. เลือก Execute as: Me และกำหนด Who has access ตามนโยบายโรงเรียน

## วิธีเปิด GitHub Pages

1. ไปที่ Settings ของ repository
2. เลือก Pages
3. Source เลือก Deploy from a branch
4. Branch เลือก `main` และ folder เลือก `/root`
5. กด Save
6. รอ GitHub สร้างหน้าเว็บ แล้วเปิดที่ https://theerawa21.github.io/green-passport-st-theresa/

## หมายเหตุ

ถ้าใช้งานผ่าน Google Apps Script แนะนำให้ใช้เวอร์ชันที่ deploy จาก Apps Script เป็นหลัก เพราะระบบจะเชื่อมกับ Google Sheets และบันทึกข้อมูลจริงได้ ส่วน GitHub Pages เหมาะสำหรับแสดงหน้าเว็บตัวอย่างหรือใช้เป็นหน้ารวบรวมลิงก์โครงการ
