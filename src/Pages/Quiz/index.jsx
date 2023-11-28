import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../Api/api";
import QuestionCard from "../../Components/QuestionCard";
import "./Quiz.css";
import Modal from "../../Components/Modal";
import Loading from "../../Components/Loading";

const Quiz = () => {
  const { difficulty, amount } = useParams();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await api.getQuizData(difficulty, amount);
      setQuestionsData(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="Quiz">
          {modal ? (
            <Modal score={score} />
          ) : (
            <QuestionCard
              questionsData={questionsData}
              amount={amount}
              modal={modal}
              setModal={setModal}
              score={score}
              setScore={setScore}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
