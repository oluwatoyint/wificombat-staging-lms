type CoverImage = {
  id: string;
  created_at: string;
  updated_at: string;
  is_fake_data: boolean;
  media_type: string;
  media: string;
  metadata: Record<string, unknown>;
  cover_art: string | null;
  downloaded_media: string | null;
  downloaded_media_url: string | null;
};

type Pathway = {
  id: string;
  title: string;
  description: string;
  cover_image: CoverImage;
  created_at: string;
  updated_at: string;
};

export type RecommendedPathway = {
  pathway: Pathway;
  rank: number;
};
