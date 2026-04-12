interface Media {
  id: string;
  created_at: string;
  updated_at: string;
  is_fake_data: boolean;
  media_type: string;
  media: string;
  metadata: Record<string, unknown>;
  cover_art: null;
  downloaded_media: null;
  downloaded_media_url: null;
}

interface QuizOption {
  id: string;
  text_option: string | null;
  option_label: string;
  image_option: string | null;
}

interface Quiz {
  id: string;
  type: "multiple_choice" | "true_false";
  question: string;
  lesson: string;
  correct_answer: string;
  options: QuizOption[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  cover_image: Media;
  module: string;
  transcript: string;
  lesson_quizes: Quiz[];
  note: string;
  video_embed: string;
  order: number;
  created_at: string;
  updated_at: string;
  is_unlocked_for_user: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  module: {
    id: string;
    title: string;
    description: string;
    cover_image: Media;
    course: {
      id: string;
      title: string;
      description: string;
      instructor: null;
      cover_image: Media;
      level: string;
      stage: string;
      course_pathway: {
        id: string;
        title: string;
        description: string;
        cover_image: Media;
        created_at: string;
        updated_at: string;
      };
      amount: string;
      badge_icon: null;
      created_at: string;
      updated_at: string;
    };
    badge_icon: null;
    learning_outcome: string;
    objectives: string;
    created_at: string;
    updated_at: string;
  };
  grading_description: string;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

interface CoursePathway {
  id: string;
  title: string;
  description: string;
  cover_image: Media;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: null;
  cover_image: Media;
  level: string;
  stage: string;
  course_pathway: CoursePathway;
  amount: string;
  badge_icon: null;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  cover_image: Media;
  course: Course;
  badge_icon: null;
  learning_outcome: string;
  objectives: string;
  created_at: string;
  updated_at: string;
  module_flashcards: any[]; // Replace 'any' with a more specific type if needed
  module_assignments: Assignment[];
  module_lessons: Lesson[];
  has_completed_lesson: boolean;
}

export interface ModuleResponse extends Module {}
