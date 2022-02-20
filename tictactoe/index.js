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

const checkWinner = (target) => {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;

  // 세 칸 다 채워졌나?
  let hasWinner = false;
  // 가로줄 검사
  if (
    rows[rowIndex][0].innerText === turn &&
    rows[rowIndex][1].innerText === turn &&
    rows[rowIndex][2].innerText === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].innerText === turn &&
    rows[1][cellIndex].innerText === turn &&
    rows[2][cellIndex].innerText === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].innerText === turn &&
    rows[1][1].innerText === turn &&
    rows[2][2].innerText === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].innerText === turn &&
    rows[1][1].innerText === turn &&
    rows[2][0].innerText === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};

const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);
  // 승자가 있으면
  if (hasWinner) {
    result.innerText = `${turn}님이 승리!`;
    table.removeEventListener("click", callback);
    return;
  }
  // 승자가 없으면
  const draw = rows.flat().every((cell) => cell.innerText);
  if (draw) {
    result.innerText = "무승부";
    return;
  }
  if (turn === "O") {
    turn = "X";
  } else if (turn === "X") {
    turn = "O";
  }
};


let clickable = true;
const callback = (event) => {
  if (!clickable) {
    return;
  }
  if (event.target.innerText !== "") { // 칸이 이미 채워져 있는가?
    console.log("빈칸이 아닙니다.");
    return;
  }
  // 빈칸이면
  console.log("빈칸입니다");
  event.target.innerText = turn;
  // 승부 판단하기
  checkWinnerAndDraw(event.target);
  if (turn === "X") {
    const emptyCells = rows.flat().filter((v) => !v.innerText);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; 
    clickable = false;
    setTimeout(() => {
      randomCell.innerText = "X";
      checkWinnerAndDraw(event.target);
      clickable = true;
    }, 1000);
  }
};

for (let i = 1; i <= 3; i++) {
  const tr = document.createElement("tr");
  const cells = [];
  for (let j = 1; j <= 3; j++) {
    const td = document.createElement("td");
    cells.push(td);
    tr.append(td);
  }
  rows.push(cells);
  table.append(tr);
}
console.log(turn);
table.addEventListener("click", callback);
body.append(table);
body.append(result);