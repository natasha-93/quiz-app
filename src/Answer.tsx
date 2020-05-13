import * as React from "react";
import { IAnswer } from "./models/Answer";
import styles from "./Answer.module.css";
import clsx from "clsx";

export interface AnswerProps {
  answer: IAnswer;
  selectedAnswer: IAnswer | null;
  onSelect: (answer: IAnswer) => void;
}

const Answer: React.SFC<AnswerProps> = ({
  answer,
  selectedAnswer,
  onSelect,
}) => {
  return (
    <li
      className={clsx(styles.answer, {
        [styles.correct]: selectedAnswer != null && answer.isCorrect,
        [styles.incorrect]:
          selectedAnswer !== null &&
          selectedAnswer.text === answer.text &&
          !selectedAnswer.isCorrect,
      })}
      onClick={(e) => {
        if (selectedAnswer == null) {
          onSelect(answer);
        }
      }}
      dangerouslySetInnerHTML={{ __html: answer.text }}
    />
  );
};

export default Answer;
