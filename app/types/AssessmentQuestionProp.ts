export interface AssessmentQuestionOption {
  value: number;
  opt_text: string;
  opt_label: string;
  opt_pathway: "coding" | "multi_media" | "gaming" | "robotics" | "ai" | string; // string fallback for other possible values
}

export interface AssessmentQuestion {
  id: string;
  age_grp: string;
  qus: string;
  options: AssessmentQuestionOption[];
  created_at: string;
  updated_at: string;
  pathway: string | null;
  question_type: "determine_interest" | string; // string fallback for other possible types
  correct_answer: string;
}
