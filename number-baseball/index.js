const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $logs = document.querySelector('#logs');

const numbers = []; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}
const answer = []; // [3, 1, 4, 6]
for (let n = 0; n < 4; n++) { // 네 번 반복
  const index = Math.floor(Math.random() * (numbers.length - n)); // 0~8 정수
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

const tries = [];
function checkInput(input) {
  if (input.length !== 4) { // 길이는 4가 아닌가
    return alert('4자리 숫자를 입력해 주세요.');
  }
  if (new Set(input).size !== 4) { // 중복된 숫자가 있는가
    return alert('중복되지 않게 입력해 주세요.');
  }
  if (tries.includes(input)) { // 이미 시도한 값은 아닌가
    return alert('이미 시도한 값입니다.');
  }
  return true;
} // 검사하는 코드

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = $input.value;
  $input.value = '';
  if (!checkInput(value)) {
    return;
  }
  // 입력값 문제없음
  if (answer.join('') === value) { // [3, 1, 4, 6] -> '3146'
    $logs.textContent = '홈런!';
    return;
  }
  if (tries.length >= 9) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
    $logs.appendChild(message);
    return;
  }
  // 몇 스트라이크 몇 볼인지 검사
  let strike = 0;
  let ball = 0;
  // answer: 3146, value: 1234
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) { // 일치하는 숫자 발견
      if (index === i) { // 자릿수도 같음
        strike += 1;
      } else { // 숫자만 같음
        ball += 1;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}:아웃`, document.createElement('br'));
  } else {
    $logs.append(`${value} : ${strike}스트라이크, ${ball}볼`, document.createElement('br'));
  }
  if (out === 3) {
    defeated();
    return;
  }
  tries.push(value);
});