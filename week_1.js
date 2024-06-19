// 1. 0 ~ 9 까지 랜덤 숫자 생성하기 (** 질문 사항 ** gpt는 while문 권장)
function RandomBall() {
  let RandomNumber = [];
  for (let i = 0; RandomNumber.length < 3;) {
    let number = Math.floor(Math.random() * 10); // 랜덤 숫자 생성
    if (!RandomNumber.includes(number)) { // 중복 되지 않는 수 추가
      RandomNumber.push(number);
      i++;
    }
  }
  return RandomNumber.join(''); // 문자열로 변환
}

/* while문 사용
while (RandomNumber.length < 3) {
  let number = Math.floor(Math.random() * 10); // 0과 9 사이의 랜덤 숫자 생성
  if (!RandomNumber.includes(number)) { // 중복되지 않은 숫자만 추가
      RandomNumber.push(number);
  }
*/

// 2. strike, ball 판단 
function Ball_count(computer_number, user_number) {
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < user_number.length; i++) {
    if (user_number[i] === computer_number[i]) {
      strike++;
    } else if (computer_number.includes(user_number[i])) {
      ball++;
    }
  }
  return `${ball}B${strike}S`;
}

// 3. 게임 시작 
function GameStart() {
  const computer_number = RandomBall(); // 컴퓨터가 생성한 랜덤 숫자
  let attempt = 0; // 시도 횟수 초기화

  console.log("3자리의 랜덤 숫자를 생성했습니다 맞춰보세요!!");

  const user_answer = document.getElementById("user_answer");
  const hintElement = document.getElementById("hint");
  const attemptsElement = document.getElementById("attempt");

  function answer() {
    let guess = user_answer.value.trim();

    // 입력 유효성 검사: 3자리 숫자, 중복된 숫자 없음 (정규식 사용 ** 질문사항 **)
    if (guess.length !== 3 || new Set(guess).size !== 3 || !/^\d{3}$/.test(guess)) {
      hintElement.innerText = "서로 다른 3자리 숫자를 입력하세요.";
      return;
    }

    attempt++; 
    const hint = Ball_count(computer_number, guess); // strike, ball 카운트
    hintElement.innerText = hint;

    if (hint === '0B3S') {
      hintElement.innerText = `${attempt}번 시도 끝에 정답입니다. 게임을 종료합니다.`;
      user_answer.disabled = true; // 정답 후 정답란 비활성화 기능 추가
      document.querySelector("button").disabled = true; // 정답시 제출 버튼 비활성 기능 추가
    } else {
      attemptsElement.innerText = `${attempt}번째 시도 : `;
      user_answer.value = ''; // 입력 필드 초기화
    }
  }

  // 제출 버튼
  document.querySelector("button").addEventListener("click", answer);

  // 엔터 키 기능 추가
  user_answer.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      answer();
    }
  });
}

GameStart();
