import React, { useState, useEffect } from "react";
import { Question } from "./models/Question";
import MulitpleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import { IAnswer } from "./models/Answer";
import { Category } from "./models/Category";
import styles from "./App.module.css";

function App() {
  const [questions, setQuestions] = useState<Question[] | null>();
  const [category, setCategory] = useState<Category>(
    Category.GENERAL_KNOWLEDGE
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const question = questions != null ? questions[currentQuestionIndex] : null;

  const handleSelectedAnswer = (answer: IAnswer) => {
    setSelectedAnswer(answer);
    if (answer.isCorrect) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}`)
      .then((response) => response.json())
      .then(({ results }) => {
        setLoading(false);
        setQuestions(results);
      });
  }, []);

  return (
    <div className={styles.app}>
      {(loading || questions == null) && (
        <div className={styles.loading}>Loading...</div>
      )}

      {question != null && (
        <>
          {question.type === "multiple" && (
            <MulitpleChoiceQuestion
              question={question}
              selectedAnswer={selectedAnswer}
              onSelect={handleSelectedAnswer}
            />
          )}
          {question.type === "boolean" && (
            <TrueFalseQuestion
              question={question}
              selectedAnswer={selectedAnswer}
              onSelect={handleSelectedAnswer}
            />
          )}
          <button
            className={styles.nextButton}
            disabled={selectedAnswer == null}
            onClick={(e) => {
              setLoading(false);
              setSelectedAnswer(null);
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
          >
            Next Question
          </button>
        </>
      )}
      {questions != null && currentQuestionIndex >= questions.length && (
        <div className={styles.finished}>You finished!</div>
      )}
      {questions != null && (
        <div className={styles.score}>
          Score: {score} /{" "}
          {questions != null && currentQuestionIndex < questions.length
            ? currentQuestionIndex + 1
            : currentQuestionIndex}
        </div>
      )}
    </div>
  );
}

export default App;
