const 정답 = "KOREA";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  // 키보드 클릭 이벤트 처리 함수
  const handleKeyboardClick = (event) => {
    const clickedElement = event.target;
    if (!clickedElement.classList.contains("keyboard-column")) return;

    const text = clickedElement.innerText.trim(); // 클릭된 요소의 텍스트
    const key = text.toUpperCase();
    // 클릭된 요소의 텍스트가 비어있으면 아무 동작도 하지 않음

    // 클릭된 요소의 텍스트를 대문자로 변환

    if (key === "BACK") {
      handleBackspace();
    } else if (key === "ENTER") {
      handlEnterKey();
    } else {
      simulateKeyPress(key);
    }
  };

  // 키보드 클릭 이벤트 등록
  const keyboardColumns = document.querySelectorAll(".keyboard-column");
  keyboardColumns.forEach((column) => {
    column.addEventListener("click", handleKeyboardClick);
  });

  // 키보드 이벤트 발생 함수
  function simulateKeyPress(key) {
    const keyCode = key.charCodeAt(0);
    const keyboardEvent = new KeyboardEvent("keydown", {
      key: key,
      keyCode: keyCode,
    });
    window.dispatchEvent(keyboardEvent);
  }

  // Enter 키 처리 함수
  const handleEnterKey = () => {
    handlEnterKey();
  };

  // Backspace 키 처리 함수
  const handleBackspace = () => {
    if (index > 0) {
      index -= 1;
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${index}']`
      );
      block.innerText = "";
    }
  };
}
const displayGameover = () => {
  const div = document.createElement("div");
  div.innerText = "게임이 종료되었습니다";
  div.style =
    "display=flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:rainbow; transition : transform 0.5s escape";
  document.body.appendChild(div);

  //확대 축소 애니메이션
  setTimeout(() => {
    div.style.transform = "scale(1.2)"; //확대하기
  }, 500); //0.1초후 확대

  setTimeout(() => {
    div.style.transform = "scale(1)"; //축소하기
  }, 6000); //6초 후에 축소하기
};

const gameover = () => {
  window.removeEventListener("keydown", handlekeydown);

  displayGameover();
  clearInterval(timer);
};

const nextline = () => {
  if (attempts === 6) return gameover();
  attempts += 1; //한줄 더해서 다음줄로 넘어가기
  index = 0; //인덱스 초기화
};

const handlEnterKey = () => {
  let 맞은_갯수 = 0;

  for (let i = 0; i < 5; i++) {
    const block = document.querySelector(
      `.board-column[data-index='${attempts}${i}']`
    );
    const 입력한_글자 = block.innerText;
    const 정답_글자 = 정답[i];
    if (입력한_글자 === 정답_글자) {
      맞은_갯수 += 1;
      block.style.background = "#6aaa64";
      {
        block.classList.add("blink"); // 정답 맞춘 칸을 반짝이도록 만들기
        block.classList.remove("blink"), 500;
      }
    } else if (정답.includes(입력한_글자)) {
      block.style.background = "#ff0000"; //빨간색
      block.classList.add("shake");
      setTimeout(() => {
        block.style.background = "#787c7e"; //원래 색상을 복구
        block.classList.remove("shake");
      }, 500); // 0.5초 후에 원래 색상 복구
    } else {
      block.style.background = "#787c7e";
    }
    block.style.color = "white";
  }
  if (맞은_갯수 === 5) gameover();
  else nextline();
};

const handleBackspace = () => {
  if (index > 0) {
    const preBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index - 1}']`
    );
    preBlock.innerText = "";
  }
  if (index !== 0) index -= 1;
};

const handlekeydown = (event) => {
  const key = event.key.toUpperCase();
  const keyCode = event.keyCode;
  const thisBlock = document.querySelector(
    `.board-column[data-index='${attempts}${index}']`
  );

  if (event.key === "Backspace") handleBackspace();
  else if (index === 5) {
    if (event.key === "Enter") handlEnterKey();
    else return;
  } else if (65 <= keyCode && keyCode <= 90) {
    thisBlock.innerText = key;
    index += 1;
    //index = index + 1;
    //index+=1;
    //index++
    //위 세가지는 여기서는 같은표현 다른곳에서는 아닌듯?
  }
};

function starttime() {
  const 시작_시간 = new Date();

  function setTime() {
    const 현재_시간 = new Date();
    const 흐른_시간 = new Date(현재_시간 - 시작_시간);
    const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0"); //tostring는 문자열로 바꿔준다
    const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
    const timeDiv = document.querySelector("#timer");
    timeDiv.innerText = `${분}:${초}`; // 앞에 0을 붙어서 표시해준다
  }

  //1회성
  //밀리미터 1000=1초
  //주기성
  timer = setInterval(setTime, 1000);
}

starttime();
window.addEventListener("keydown", handlekeydown);

appStart();
