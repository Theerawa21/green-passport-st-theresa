# Green Passport - St. Theresa Zero Waste

ระบบเว็บแอปภาษาไทยสำหรับบันทึกข้อมูลการจัดการขยะ คำนวณการลดคาร์บอน และใช้ประกอบโครงการนวัตกรรมดิจิทัลของโรงเรียนเซนต์เทเรซา

## ลิงก์สำคัญ

- หน้า Repository: https://github.com/Theerawa21/green-passport-st-theresa
- หน้าเว็บ GitHub Pages: https://theerawa21.github.io/green-passport-st-theresa/
- ไฟล์หน้าเว็บ GitHub Pages: https://github.com/Theerawa21/green-passport-st-theresa/blob/main/index.html
- ไฟล์ Code.gs: https://github.com/Theerawa21/green-passport-st-theresa/blob/main/Code.gs
- คู่มือติดตั้ง Apps Script: https://github.com/Theerawa21/green-passport-st-theresa/blob/main/APPS_SCRIPT_SETUP.md
- Google Sheets ฐานข้อมูล: https://docs.google.com/spreadsheets/d/1CB501XSK9SOA-OsGdDIYqPjxEoUYitKOFKlbpA4yHJ4/edit?usp=sharing

## สิ่งที่สร้างไว้ใน GitHub แล้ว

- `README.md` รวมคำอธิบาย ลิงก์ และวิธีติดตั้ง
- `index.html` หน้า Landing Page สำหรับเปิดผ่าน GitHub Pages
- `Code.gs` โค้ด Google Apps Script สำหรับเชื่อมกับ Google Sheets
- `APPS_SCRIPT_SETUP.md` คู่มือการติดตั้งบน Google Apps Script

## วิธีเปิด GitHub Pages

1. ไปที่ Settings ของ repository
2. เลือก Pages
3. Source เลือก Deploy from a branch
4. Branch เลือก `main` และ folder เลือก `/root`
5. กด Save
6. รอ GitHub สร้างหน้าเว็บ แล้วเปิดที่ https://theerawa21.github.io/green-passport-st-theresa/

## วิธีติดตั้งบน Google Apps Script

อ่านคู่มือแบบเต็มที่ `APPS_SCRIPT_SETUP.md`

สรุปขั้นตอน:

1. เปิด Google Sheets ฐานข้อมูล
2. ไปที่ Extensions > Apps Script
3. วางโค้ดจาก `Code.gs`
4. สร้างไฟล์ HTML ชื่อ `Index`
5. วางโค้ดหน้าเว็บฉบับเต็มของระบบ
6. Run ฟังก์ชัน `setupGreenPassport()`
7. Deploy เป็น Web App

## หมายเหตุ

GitHub Pages เหมาะสำหรับเป็นหน้าแนะนำโครงการและรวมลิงก์สำคัญ ส่วนระบบที่บันทึกข้อมูลจริงควร deploy ผ่าน Google Apps Script เพราะต้องเชื่อมกับ Google Sheets
