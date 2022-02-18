/*  <table>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>  */

const { body } = document;

const table = document.createElement("table");
const result = document.createElement("div");
const rows = [];
let turn = "O";

  // [
  //   [td, td, td],
  //   [td, td, td],
  //   [td, td, td],
  // ]

const callback = (event) => {
  if (event.target.innerText !== "") { // 칸이 이미 채워져 있는가?
    console.log("빈칸이 아닙니다.");
    return;
  }
  // 빈칸이면
  console.log("빈칸입니다");
  event.target.innerText = turn;

  if (turn === "O") {
    turn = "X";
  } else if (turn === "X") {
    turn = "O";
  }
};

for (let i = 1; i <= 3; i++) {
  const tr = document.createElement("tr");
  const cells = [];
  for (let j = 1; j <= 3; j++) {
    const td = document.createElement("td");
    cells.push("td");
    td.addEventListener("click", callback);
    tr.append(td);
  }
  rows.push(cells);
  table.append(tr);
}
body.append(table);
body.append(result);