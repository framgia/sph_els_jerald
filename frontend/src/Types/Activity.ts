export type Activity = {
  id: number;
  user_id: number;
  quiz_id: number;
  created_at: string;
  updated_at: string;
  firstName?: string;
  count_learned_words?: number;
  count_total_words?: number;
  quiz_title?: string;
  user_firstName?: string;
  follow_firstName?: string;
  follow_id?: number;
  type: string;
  timestamp: string;
  avatar: string;
};

export const ActivityInitial = {
  id: 0,
  user_id: 0,
  quiz_id: 0,
  created_at: "",
  updated_at: "",
  firstName: "",
  count_learned_words: "",
  count_total_words: "",
  quiz_title: "",
  user_firstName: "",
  follow_firstName: "",
  follow_id: 0,
  type: "",
  timestamp: "",
  avatar: "",
};
