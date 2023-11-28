import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../Components/Select";
import "./Home.css";

const Home = () => {
  const [changeCount, setChangeCount] = useState("");
  const [changeDifficulty, setChangeDifficulty] = useState("");
  const navigate = useNavigate();

  const count = [10, 20, 30, 40, 50];
  const difficulty = ["easy", "medium", "hard"];

  const startQuiz = () => {
    if (changeDifficulty && changeCount)
      navigate(`/quiz/${changeDifficulty}/${changeCount}`);
  };

  return (
    <div className="Home">
      <div className="container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsd0_51x-8LpzvMTd_PwmJyXph6YwHFLbYKGOp-TgIMrrzwbVKQ_xxevH_lgS1xVIABw8&usqp=CAU"
          alt="logo"
        />
        <div className="content">
          <h1 className="title">Number of Questions:</h1>
          <Select data={count} setData={setChangeCount} />
          <h1 className="title">Select Difficulty:</h1>
          <Select data={difficulty} setData={setChangeDifficulty} />
          <button className="btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
