export type Difficulty = "easy" | "medium" | "hard";
export type TrueFalse = "True" | "False";

export interface IMultipleChoiceQuestion {
  category: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: [string, string, string];
  question: string;
  type: "multiple";
}

export interface ITrueFalseQuestion {
  category: string;
  correct_answer: TrueFalse;
  difficulty: Difficulty;
  incorrect_answers: [TrueFalse];
  question: string;
  type: "boolean";
}

export type Question = IMultipleChoiceQuestion | ITrueFalseQuestion;
