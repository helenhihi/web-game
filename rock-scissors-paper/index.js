const $computer = document.querySelector('#computer');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const $score = document.querySelector('#score');
const IMG_URL = './image/rsp.png';
$computer.style.background = `url(${IMG_URL}) -464px 0`;
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
  scissors: '0', // 가위
  rock: '-220px', // 바위
  paper: '-440px', // 보
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
  if (computerChoice === 'rock') {
    computerChoice = 'scissors';
  } else if (computerChoice === 'scissors') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'rock';
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = 'auto 200px';
};
let intervalId = setInterval(changeComputerHand, 50);

// clickButton 5번 호출, 인터벌 1번, 2번, 3번, 4번, 5번(얘만 intervalId)
// 그 다음에 버튼을 클릭하면 5번만 취소
let clickable = true;
let myScore = 0;
let computerScore = 0;
const clickButton = () => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;
    // 결과를 화면에 표시
    const myChoice = event.target.innerText === "바위"
      ? "rock"
      : event.target.innerText === "가위"
        ? "scissors"
        : "paper";

    let message;
    if (myChoice === 'rock') {
      if (computerChoice === 'rock') {
        message = '무승부';
      } else if (computerChoice === 'scissors') {
        myScore += 1;
        message = '승리';
      } else if (computerChoice === 'paper') {
        computerScore += 1;
        message = '패배';
      }
    } else if (myChoice === 'scissors') {
      if (computerChoice === 'rock') {
        computerScore += 1;
        message = '패배';
      } else if (computerChoice === 'scissors') {
        message = '무승부';
      } else if (computerChoice === 'paper') {
        myScore += 1;
        message = '승리';
      }
    } else if (myChoice === 'paper') {
      if (computerChoice === 'rock') {
        myScore += 1;
        message = '승리';
      } else if (computerChoice === 'scissors') {
        computerScore += 1;
        message = '패배';
      } else if (computerChoice === 'paper') {
        message = '무승부';
      }
    }

    if (myScore >= 3) {
      $score.textContent = `나의 승리 ${myScore}:${computerScore}`;
    } else if (computerScore >= 3) {
      $score.textContent = `컴퓨터의 승리 ${myScore}:${computerScore}`;
    } else {
      $score.textContent = `${message} ${myScore}:${computerScore}`
      setTimeout(() => {
        clickable = true;
        intervalId = setInterval(changeComputerHand, 50);
      }, 1000);
    }
  }
};

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);