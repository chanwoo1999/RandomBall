// 전역변수 사용을 줄이기 위해 모듈화
const BaseBallGame = (() => {
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

    /** 랜덤번호 생성함수 */
    const generateRandomNumbers = () => {
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

    /** 번호 검증 함수 ( 랜덤번호배열, 사용자입력배열 ) */
    const confirmNumber = (randomNumberArray, userInputArray) => {
        let strike = 0;
        let ball = 0;

        // for (let i = 0; i < array1.length; i++) {
        //     if (array1[i] === array2[i]) {
        //         strike++;
        //     } else if (array1.includes(array2[i])) {
        //         ball++;
        //     }
        // }

        strike = randomNumberArray.filter((v, i) => v === userInputArray[i]).length;
        ball = randomNumberArray.filter((v, i) => v !== userInputArray[i] && userInputArray.includes(v)).length;

        attemptCount++;
        return { strike, ball };
    };

    /** 리스트 업데이트 함수  */
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

    /** 모달창 변경 함수 */
    const setModal = (text, buttonText) => {
        modalBoxValue.innerHTML = text;
        startButton.textContent = buttonText;
    };

    /** 설정값 초기화 함수 */
    const reset = () => {
        modalBox.classList.add('invisible');
        attemptCount = 0;
        userNumberList.length = 0;
        results.length = 0;
        resultBox.textContent = '';
        listBox.textContent = '';
        submitNumbers.forEach((el) => (el.value = ''));
    };

    startButton.addEventListener('click', () => {
        randomNumbers = generateRandomNumbers();
        console.log(randomNumbers); //개발용 콘솔 정답
        reset();
    });

    submitButton.addEventListener('click', () => {
        const submitNumbersArray = [...submitNumbers].map((el) => +el.value);
        if (submitNumbersArray.some(isNaN)) {
            alert('숫자를 입력해주세요.');
            return;
        }
        const userInputNumber = submitNumbersArray.join('');
        userNumberList = [...userNumberList, userInputNumber];
        const { strike, ball } = confirmNumber(randomNumbers, submitNumbersArray);
        results = [...results, { strike, ball }];
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
})();
