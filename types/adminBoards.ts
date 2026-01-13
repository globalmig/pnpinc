export type GalleryItem = {
  id: string;
  title: string;
  image_links: string[];
  created_at: string;
  updated_at: string;
};

export type NoticeItem = {
  id: string;
  title: string;
  description: string;
  posted_at: string; // YYYY-MM-DD
  image_links: string[];
  created_at: string;
  updated_at: string;
};

export type BranchItem = {
  id: string;
  name: string;
  location: string;
  phone: string;
  map_link: string;
  created_at: string;
  updated_at: string;
};
