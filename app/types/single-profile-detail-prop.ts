export interface SingleUserProfileDetailProp {
  id: string;
  email: string;
  full_name: string | null;
  first_name: string;
  last_name: string;
  street: string;
  zipcode: string | null;
  school_type: string | null;
  phone: string | null;
  date_of_birth: string | null;
  bio: string | null;
  sex: string | null;
  role: string;
  is_active: true;
  school: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    school_type: string;
    school_website: string;
    school_phone: string;
  };
  profile_pic: {
    id: string;
    created_at: string;
    updated_at: string;
    is_fake_data: false;
    media_type: string;
    media: string;
    metadata: {};
    cover_art: null;
    downloaded_media: null;
    downloaded_media_url: null;
  } | null;
  age: string | null;
  interest: string | null;
  user_interests: string[];
  _class: string | null;
  country: string;
  current_stage: string;
  teacherId: string | null;
  no_student_you_teach: number;
  date_joined: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}
