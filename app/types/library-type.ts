export type MediaItem = {
  id: string;
  media: string | null;
  media_type: "photo" | "video" | string;
  created_at: string;
  updated_at: string;
  downloaded_media: string | null;
  downloaded_media_url: string | null;
  is_fake_data: boolean;
  metadata: Record<string, any>;
};

export type Pathway = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  role: string;
  profile_pic: string | null;
};

export type LibraryItem = {
  id: string;
  title: string;
  description: string;
  library_type: "video" | "document" | string;
  media: string | null;
  cover_image?: string;
  cover_art?: string | null;
  created_at: string;
  updated_at: string;
  video_embed?: string;
  pathway?: Pathway;
  user?: User;
};
