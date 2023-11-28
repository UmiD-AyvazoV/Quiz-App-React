const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getQuizData = async (difficulty, amount) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
  const data = await (await fetch(url)).json();
  return data.results.map((dt) => ({
    ...dt,
    answers: shuffleArray([...dt.incorrect_answers, dt.correct_answer]),
  }));
};