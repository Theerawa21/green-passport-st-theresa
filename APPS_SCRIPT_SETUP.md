# วิธีติดตั้ง Green Passport บน Google Apps Script

ไฟล์นี้สรุปขั้นตอนสำหรับนำระบบ Green Passport - St. Theresa Zero Waste ไป deploy เป็น Web App ที่เชื่อมกับ Google Sheets จริง

## ลิงก์ที่เกี่ยวข้อง

- Repository: https://github.com/Theerawa21/green-passport-st-theresa
- หน้า GitHub Pages: https://theerawa21.github.io/green-passport-st-theresa/
- Google Sheets ฐานข้อมูล: https://docs.google.com/spreadsheets/d/1CB501XSK9SOA-OsGdDIYqPjxEoUYitKOFKlbpA4yHJ4/edit?usp=sharing
- Code.gs บน GitHub: https://github.com/Theerawa21/green-passport-st-theresa/blob/main/Code.gs

## ขั้นตอนติดตั้ง

1. เปิด Google Sheets ฐานข้อมูล
2. ไปที่ `Extensions > Apps Script`
3. วางโค้ดจากไฟล์ `Code.gs` ลงในไฟล์ `Code.gs`
4. สร้างไฟล์ HTML ชื่อ `Index`
5. วางโค้ดหน้าเว็บฉบับเต็มลงในไฟล์ `Index`
6. กด Save
7. กด Run ฟังก์ชัน `setupGreenPassport()` หนึ่งครั้ง
8. อนุญาตสิทธิ์ Google Apps Script
9. ไปที่ `Deploy > New deployment > Web app`
10. เลือก `Execute as: Me`
11. เลือกสิทธิ์ผู้เข้าถึงตามนโยบายโรงเรียน
12. กด Deploy แล้วนำ URL ที่ได้ไปใช้งาน

## หมายเหตุสำคัญ

- ไฟล์ `index.html` ใน repo นี้เป็นหน้า GitHub Pages สำหรับแนะนำโครงการและรวมลิงก์สำคัญ
- ไฟล์ HTML สำหรับ Apps Script ต้องชื่อ `Index` ใน Apps Script
- `Code.gs` ผูกกับ Spreadsheet ID นี้แล้ว: `1CB501XSK9SOA-OsGdDIYqPjxEoUYitKOFKlbpA4yHJ4`
- ถ้าขึ้น error ว่าชีตมีอยู่แล้ว ให้ใช้ `Code.gs` เวอร์ชันล่าสุด เพราะมี `LockService` และ `getOrCreateSheet_()` กันการสร้างชีตซ้ำแล้ว
- ถ้ารูปหายหรือขึ้น 404 ใน Apps Script ให้ใช้ HTML เวอร์ชันที่ฝังโลโก้เป็น `data:image/webp;base64,...`
