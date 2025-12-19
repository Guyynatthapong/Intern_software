import { categorizer } from "./categorizer";

async function run() {
  console.log(await categorizer("กาแฟ Cafe Amazon")); 
  console.log(await categorizer("เติมน้ำมัน ปตท"));   
  console.log(await categorizer("ค่าไฟฟ้า"));         
  console.log(await categorizer("รองเท้า Nike"));     
  console.log(await categorizer("ของขวัญวันเกิด"));
  console.log(await categorizer(""));
  console.log(await categorizer("แมว"));
  console.log(await categorizer("จ่ายค่าเช่าห้อง"));
  console.log(await categorizer("asdfghjkl 12345"));
}


run();