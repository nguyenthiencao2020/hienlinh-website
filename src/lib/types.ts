export type Program = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  content: string;
  cover_image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  kind: "volunteer" | "donation" | "contact";
  full_name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  status: "new" | "read" | "archived";
  created_at: string;
};
