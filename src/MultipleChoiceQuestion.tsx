import React, { useState, useEffect } from "react";
import { IMultipleChoiceQuestion } from "./models/Question";
import { IAnswer } from "./models/Answer";
import Answer from "./Answer";
import { shuffle } from "lodash";
import styles from "./Question.module.css";

export interface MulitpleChoiceQuestionProps {
  selectedAnswer: IAnswer | null;
  onSelect: (answer: IAnswer) => void;
  question: IMultipleChoiceQuestion;
}

const MulitpleChoiceQuestion: React.SFC<MulitpleChoiceQuestionProps> = ({
  selectedAnswer,
  onSelect,
  question,
}) => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  useEffect(() => {
    const incorrectAnswers = question.incorrect_answers.map((answer) => ({
      text: answer,
      isCorrect: false,
    }));

    setAnswers(
      shuffle([
        ...incorrectAnswers,
        { text: question.correct_answer, isCorrect: true },
      ])
    );
  }, [question.question]);

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

export default MulitpleChoiceQuestion;
