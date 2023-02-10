export interface LastUpdateUser {
  id: number;
  name: string;
  profile_image_url: string;
}

export interface EmailTemplatesResponse {
  id: string;
  name: string;
  type: string;
  content: string;
  last_update_user_id: number;
  created_at: number;
  updated_at: number;
  last_update_user: LastUpdateUser;
}
