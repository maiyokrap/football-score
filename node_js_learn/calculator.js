// calculator.js
// ใช้ readline เพื่อรับ input จากผู้ใช้ใน terminal
const readline = require("readline");

// สร้าง interface สำหรับอ่าน/เขียนใน terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ถามช่องแรก
rl.question("ใส่ตัวเลขแรก: ", (num1) => {
  // ถามช่องสอง
  rl.question("ใส่ตัวเลขที่สอง: ", (num2) => {
    // แปลง input เป็นตัวเลข
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    // บวกกัน
    const result = a + b;

    console.log(`ผลลัพธ์ของ ${a} + ${b} = ${result}`);

    // ปิดการทำงานของ readline
    rl.close();
  });
});
