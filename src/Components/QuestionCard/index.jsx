import { useState, useRef, useEffect } from "react";
import "./QuestionCard.css";
import clickBtn from "../../Assets/Sound/click.mp3";
import fiftyBtn from "../../Assets/Sound/50-50.wav";
import hintBtn from "../../Assets/Sound/hint.wav";
import emergencyBtn from "../../Assets/Sound/emergency.wav";
import hint from "../../Assets/Img/QuestionCard/hint.png";

const QuestionCard = ({
  questionsData,
  amount,
  modal,
  setModal,
  score,
  setScore,
}) => {
  const seconds = useRef();
  const clickSound = useRef();
  const fiftySound = useRef();
  const hintSound = useRef();
  const emergencySound = useRef();

  const btns = document.querySelectorAll(".btn span");

  const [num, setNum] = useState(0);
  const [timer, setTimer] = useState(30);

  const handleButton = () => {
    btns.forEach((btn) => (btn.style.visibility = "visible"));
  };

  const approvedChoice = (e) => {
    handleButton();
    clickSound.current.play();
    const checkAnswer = e.target.value == questionsData[num]?.correct_answer;
    if (checkAnswer) setScore(score + 100);
    setNum(num + 1);
    if (num == amount - 1) setModal(true);
    setTimer(30);
  };

  const handleFiftyFifty = () => {
    const arrs = questionsData[num]?.answers;
    const correctAnswer = questionsData[num]?.correct_answer;

    let random1 = Math.floor(Math.random() * 3);
    let random2 = Math.floor(Math.random() * 3);

    if (arrs.length == 4) {
      while (
        random1 == random2 ||
        arrs[random1] == correctAnswer ||
        arrs[random2] == correctAnswer
      ) {
        random1 = Math.floor(Math.random() * 3);
        random2 = Math.floor(Math.random() * 3);
      }

      fiftySound.current.play();
      btns[random1].style.visibility = "hidden";
      btns[random2].style.visibility = "hidden";
    }
  };

  const handleHint = () => {
    const arrs = questionsData[num].answers;
    const correctAnswer = questionsData[num]?.correct_answer;

    if (arrs.length == 4) {
      hintSound.current.play();
      let random = Math.floor(Math.random() * 3);
      while (arrs[random] == correctAnswer) {
        random = Math.floor(Math.random() * 3);
      }
      btns[random].style.visibility = "hidden";
    }
  };

  useEffect(() => {
    seconds.current.style.strokeDashoffset = 280 - (280 * timer) / 30;
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
      if (timer == 1 && num < amount) {
        handleButton();
        emergencySound.current.play();
        setNum(num + 1);
        setTimer(30);
      } else if (num >= amount) setModal(true);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div className="questionCard">
      <div className="lifeline">
        <div className="fiftyFifty" onClick={handleFiftyFifty}>
          <img
            src="https://uploads-ssl.webflow.com/5bad8809d1de42c3b84c81ff/5c9042fa5ef96f0ad7b3bedc_50%3A50%20Logo%201%20-%20Black%20png.png"
            alt="fiftyFifty"
          />
        </div>
        <div className="time">
          <div className="circle">
            <svg>
              <circle cx="45" cy="45" r="45" ref={seconds}></circle>
            </svg>
            <div>{timer}</div>
          </div>
        </div>
        <div className="hint" onClick={handleHint}>
          <img src={hint} alt="hint" />
        </div>
      </div>
      <div className="questionCard-title">
        <div className="questionNumber">
          {num + 1} of {amount}
        </div>
        {questionsData[num]?.question}
      </div>
      <div className="btn">
        {questionsData[num]?.answers.map((answer, i) => (
          <button key={i} onClick={approvedChoice} value={answer}>
            <span>{answer}</span>
          </button>
        ))}
      </div>
      <div className="hover">Are you sure about that ?</div>
      <audio ref={clickSound} src={clickBtn}></audio>
      <audio ref={fiftySound} src={fiftyBtn}></audio>
      <audio ref={hintSound} src={hintBtn}></audio>
      <audio ref={emergencySound} src={emergencyBtn}></audio>
    </div>
  );
};

export default QuestionCard;
