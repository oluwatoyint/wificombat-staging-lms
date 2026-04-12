export type QuizOption = {
  id: string;
  text_option: string;
  option_label: string; // typically "a", "b", etc.
  image_option: string | null;
};

export type QuizQuestion = {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_in_the_blank"; // expand if needed
  question: string;
  lesson: string; // this looks like a lesson ID
  correct_answer: string;
  student_answer: string;
  is_correct: boolean;
  options: QuizOption[];
};

export type gradeResponseProp = {
  data: QuizQuestion[];
  percentage_grade: number;
  summary: string;
};
