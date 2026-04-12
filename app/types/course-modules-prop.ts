export type CourseModuleProp = {
  id: string;
  title: string;
  description: string;
  cover_image: {
    id: string;
    created_at: string;
    updated_at: string;
    is_fake_data: boolean;
    media_type: string;
    media: string;
    metadata: {};
    cover_art: null;
    downloaded_media: null;
    downloaded_media_url: null;
  };
  course: {
    id: string;
    title: string;
    description: string;
    instructor: {
      id: string;
      email: string;
      full_name: string;
      first_name: null;
      last_name: null;
      role: string;
      profile_pic: {
        id: string;
        created_at: string;
        updated_at: string;
        is_fake_data: boolean;
        media_type: string;
        media: string;
        metadata: {};
        cover_art: null;
        downloaded_media: null;
        downloaded_media_url: null;
      };
    };
    cover_image: {
      id: string;
      created_at: string;
      updated_at: string;
      is_fake_data: boolean;
      media_type: string;
      media: string;
      metadata: {};
      cover_art: null;
      downloaded_media: null;
      downloaded_media_url: null;
    };
    level: string;
    stage: string;
    course_pathway: {
      id: string;
      title: string;
      description: string;
      cover_image: {
        id: string;
        created_at: string;
        updated_at: string;
        is_fake_data: boolean;
        media_type: string;
        media: string;
        metadata: {};
        cover_art: null;
        downloaded_media: null;
        downloaded_media_url: null;
      };
      created_at: string;
      updated_at: string;
    };
    amount: string;
    created_at: string;
    updated_at: string;
  };
  learning_outcome: string;
  objectives: string;
  created_at: string;
  updated_at: string;
  total_assignments: number;
  total_quizzes: number;
  total_lessons: number;
  has_submitted_assignments: boolean;
  module_progress_percentage: number;
  is_unlocked_for_user: boolean;
};
