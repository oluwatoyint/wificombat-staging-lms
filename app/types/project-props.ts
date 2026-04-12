export type ProjectProp = {
  id: string;
  title: string;
  description: string;
  grading_description: string;
  transcript: string;
  video_embed: string;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
  course: {
    id: string;
    title: string;
    description: string;
    instructor: {
      [key: string]: any;
    };
    cover_image: {
      [key: string]: any;
    };
    [key: string]: any;
  };
};
