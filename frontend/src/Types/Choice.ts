export type Choice = {
  id: number;
  question_id: number;
  value: string;
  is_correct: number;
};

export const ChoiceInitial = {
  id: 0,
  question_id: 0,
  value: "",
  is_correct: 0,
};
