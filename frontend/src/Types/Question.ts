import { Choice } from "./Choice";

export type Question = {
  id: number;
  quiz_id: number;
  word: string;
  choices: Choice[];
};

export const QuestionInitial = {
  id: 0,
  quiz_id: 0,
  word: "",
  choices: [],
};
