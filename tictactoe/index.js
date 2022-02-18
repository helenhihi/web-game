/* <table>
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
    </table> */

let turn = "O";
const data = [];
for (let i = 0; i < 3; i++) {
  data.push([]);
}
const table = document.createElement("table");
for (let i = 0; i < 3; i++) {
  const tr = document.createElement("tr");
  for (let j = 0; j < 3; j++) {
    const td = document.createElement("td");
    td.addEventListener("click", (event) => {
      // 칸에 글자가 있나?
      if (event.target.innerText) return;
      console.log("clicked");
      event.target.innerText = turn;
      // 승부 확인
      if (turn === "O") {
        turn = "X";
      } else if (turn ==="X") {
        turn = "O";
      }
    });
    tr.append(td);
  }
  table.append(tr);
}
document.body.append(table);