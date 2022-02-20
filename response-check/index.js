const screen = document.querySelector("#screen");
const result = document.querySelector("#result");

let startTime;
let endTime;
const records = [];
screen.addEventListener("click", (event) => { // screen과 event.target이 같음
  if (event.target.classList.contains("waiting")) { // 파랑
    screen.classList.replace("waiting", "ready");
    screen.innerText = "초록색이 되면 클릭하세요";
    timeoutId = setTimeout(function () {
      startTime = new Date();
      screen.classList.replace("ready", "now");
      screen.innerText = "클릭하세요!";
    }, Math.floor(Math.random() * 1000) + 2000); // 2초에서 3초 사이 2000~3000 사이 수
  } else if (event.target.classList.contains("ready")) { // 빨강
    clearTimeout(timeoutId);
    screen.classList.replace("ready", "waiting");
    screen.innerText = "너무 성급하시군요!";
  } else if (event.target.classList.contains("now")) { // 초록
    endTime = new Date();
    const current = endTime - startTime;
    console.log(endTime, startTime);
    records.push(current);
    const average = records.reduce((a, c) => a + c) / records.length;
    result.innerText = `현재: ${current}ms, 평균: ${average}ms`;
    const topFive = records.sort((p, c) => p - c).slice(0, 5);
    topFive.forEach((top, index) => {
      result.append(
        document.createElement("br"),
        `${index + 1}위: ${top}ms`,
      );
    });
    startTime = null;
    endTime = null;
    screen.classList.replace("now", "waiting");
    screen.innerText = "클릭해서 시작하세요";
  }
});