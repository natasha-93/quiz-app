import * as React from "react";
import { ITrueFalseQuestion } from "./models/Question";
import { IAnswer } from "./models/Answer";
import Answer from "./Answer";
import styles from "./Question.module.css";

export interface TrueFalseQuestionProps {
  selectedAnswer: IAnswer | null;
  onSelect: (answer: IAnswer) => void;
  question: ITrueFalseQuestion;
}

const TrueFalseQuestion: React.SFC<TrueFalseQuestionProps> = ({
  question,
  selectedAnswer,
  onSelect,
}) => {
  const incorrectAnswer = {
    text: question.incorrect_answers[0],
    isCorrect: false,
  };
  const answers: IAnswer[] = [
    incorrectAnswer,
    { text: question.correct_answer, isCorrect: true },
  ];
  return (
    <>
      <h1
        className={styles.question}
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <ul className={styles.answers}>
        {answers.map((answer, index) => (
          <Answer
            key={index}
            answer={answer}
            selectedAnswer={selectedAnswer}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </>
  );
};

export default TrueFalseQuestion;
