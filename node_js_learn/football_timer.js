// football_timer.js
// โปรแกรมจำลองนาฬิกาแข่งฟุตบอลใน Terminal
// 10 วินาทีจริง = 10 นาทีเกม, พิมพ์สกอร์ทุก 10 วินาที จนครบ 90 วินาที (= 90 นาที)

// ========== ตั้งค่าเพิ่มเติม ==========
const TICK_REAL_SECONDS = 10;      // ทุก ๆ 10 วินาทีจริง = 1 บรรทัด
const MAX_MINUTE = 90;             // จบที่ 90 นาที

// ========== ใช้ readline รับชื่อทีม ==========
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let teamA = "";
let teamB = "";
let minute = 0;
let scoreA = 0;
let scoreB = 0;
let intervalId = null;

function printLine() {
  const m = String(minute).padStart(2, " ");
  console.log(`${m}'  ${teamA} ${scoreA} : ${scoreB} ${teamB}`);
}

function startMatch() {
  console.log("\nเริ่มการแข่งขัน!\n");
  // พิมพ์นาที 0 ก่อน (Kick-off)
  printLine();

  intervalId = setInterval(() => {
    minute += 10;           // เดินทีละ 10 นาที
    scoreA += 1;       // ทีมเจ้าบ้านได้ประตูเพิ่ม +1 ทุกครั้ง
    printLine();

    if (minute >= MAX_MINUTE) {
      clearInterval(intervalId);
      console.log("\nหมดเวลา!  Full Time");
      console.log(`สรุปผล: ${teamA} ${scoreA} : ${scoreB} ${teamB}\n`);
      rl.close();
    }
  }, TICK_REAL_SECONDS * 1000);
}

// รับชื่อทีมทีละคำถาม
rl.question("ใส่ชื่อทีมเจ้าบ้าน: ", (a) => {
  teamA = a.trim() || "Team A";
  rl.question("ใส่ชื่อทีมเยือน: ", (b) => {
    teamB = b.trim() || "Team B";
    startMatch();
  });
});

// รองรับการกด Ctrl+C ให้จบอย่างสุภาพ
process.on("SIGINT", () => {
  console.log("\n\nยกเลิกการแข่งขัน (กด Ctrl+C)");
  if (intervalId) clearInterval(intervalId);
  rl.close();
  process.exit(0);
});