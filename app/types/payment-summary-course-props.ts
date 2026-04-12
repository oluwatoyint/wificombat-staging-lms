export interface BadgeIcon {
  id: string;
  created_at: string;
  updated_at: string;
  media: string;
  media_type: string;
  is_fake_data: boolean;
  metadata: Record<string, any>;
  cover_art: string | null;
  downloaded_media: string | null;
  downloaded_media_url: string | null;
  cover_image: CoverImage;
}

export interface CoverImage {
  id: string;
  created_at: string;
  updated_at: string;
  media: string;
  media_type: string;
  is_fake_data: boolean;
  metadata: Record<string, any>;
  cover_art: string | null;
  downloaded_media: string | null;
  downloaded_media_url: string | null;
}

export interface CoursePathway {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  cover_image: CoverImage;
}

export interface Instructor {
  id: string;
  email: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_pic: string | null;
  role: string;
}

export interface PaymentSummaryCourseProp {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  media: string;
  media_type: string;
  is_fake_data: boolean;
  metadata: Record<string, any>;
  cover_art: string | null;
  downloaded_media: string | null;
  downloaded_media_url: string | null;
  amount: string;
  badge_icon: BadgeIcon;
  cover_image: CoverImage;
  course_pathway: CoursePathway;
  instructor: Instructor;
  level: string;
  stage: string;
}
