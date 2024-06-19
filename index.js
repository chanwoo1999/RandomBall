const startButton = document.querySelector('.start');
const submitButton = document.getElementById('submit');
const submitNumbers = document.querySelectorAll('.submit-number');
const modalBox = document.querySelector('.modal-background');
const modalBoxValue = document.querySelector('.modal > div');
const listBox = document.querySelector('.list');
const resultBox = document.getElementById('result');

let userNumberList = []; // 유저의 입력값들
let results = []; // 입력값에 따른 결과값들
let randomNumbers = [];
let attemptCount = 0;

const setRandomNumbers = () => {
    let firstNumber, secondNumber, thirdNumber;

    firstNumber = Math.floor(Math.random() * 10);

    do {
        secondNumber = Math.floor(Math.random() * 10);
    } while (firstNumber === secondNumber);

    do {
        thirdNumber = Math.floor(Math.random() * 10);
    } while (thirdNumber === firstNumber || thirdNumber === secondNumber);

    return [firstNumber, secondNumber, thirdNumber];
};

const confirmNumber = (array1, array2) => {
    let strike = 0;
    let ball = 0;

    // for (let i = 0; i < array1.length; i++) {
    //     if (array1[i] === array2[i]) {
    //         strike++;
    //     } else if (array1.includes(array2[i])) {
    //         ball++;
    //     }
    // }

    strike = array1.filter((v, i) => v === array2[i]).length;
    ball = array1.filter((v, i) => v !== array2[i] && array2.includes(v)).length;

    attemptCount++;
    return { strike, ball };
};

const updateList = () => {
    listBox.textContent = '';
    userNumberList.forEach((el, index) => {
        const { strike, ball } = results[index];
        const liElement = document.createElement('li');
        liElement.innerHTML = ` <div>${++index}</div>
                                <div>${el}</div>
                                <div class='zone'><span class='strike b'>S</span><span>${strike}</span></div>
                                <div class='zone'><span class='ball b'>B</span><span>${ball}</span></div>  `;
        listBox.append(liElement);
    });
};

const setModal = (text, buttonText) => {
    modalBoxValue.innerHTML = text;
    startButton.textContent = buttonText;
};

startButton.addEventListener('click', () => {
    randomNumbers = setRandomNumbers();
    console.log(randomNumbers); //개발용 콘솔 정답
    // 설정값 초기화
    modalBox.classList.add('invisible');
    attemptCount = 0;
    userNumberList.length = 0;
    results.length = 0;
    resultBox.textContent = '';
    listBox.textContent = '';
    submitNumbers.forEach((el) => (el.value = ''));
});

submitButton.addEventListener('click', () => {
    const submitNumbersArray = [...submitNumbers].map((el) => +el.value);
    if (submitNumbersArray.includes(NaN)) {
        return;
    }
    const userInputNumber = submitNumbersArray.join('');
    userNumberList.push(userInputNumber);
    const { strike, ball } = confirmNumber(randomNumbers, submitNumbersArray);
    results.push({ strike, ball });
    resultBox.innerHTML = ` <p>${attemptCount}번째 시도: ${userInputNumber}</p> 
                            <div class='zone'><span class='strike b'>S</span><span>${strike}</span></div>
                            <div class='zone'><span class='ball b'>B</span><span>${ball}</span></div>
                        `;
    updateList();

    if (strike === 3) {
        let text = ` <p>${attemptCount}번만에 정답을 맞추셨습니다.</p>
                     <p>게임이 종료되었습니다.</p> `;
        let buttonText = '다시 시작';
        setModal(text, buttonText);
        modalBox.classList.remove('invisible');
        return;
    }

    submitNumbers.forEach((el) => (el.value = ''));
});

// 입력값에 따른 버튼 활성화 설정
submitNumbers.forEach((el) => {
    el.addEventListener('input', () => {
        const isInvalidValue = isNaN(+el.value);
        submitButton.disabled = isInvalidValue;
    });
});
