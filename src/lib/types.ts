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
  is_featured: boolean;
  is_success_story: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Facility = {
  id: string;
  slug: string;
  name: string;
  program_slug: string | null;
  address: string | null;
  description: string;
  cover_image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type TeamMember = {
  id: string;
  full_name: string;
  role: string;
  photo_url: string | null;
  bio: string;
  sort_order: number;
  created_at: string;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  kind: "volunteer" | "donation" | "contact";
  full_name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  interest: string | null;
  donation_amount: number | null;
  donation_frequency: "one_time" | "monthly" | null;
  status: "new" | "read" | "archived";
  created_at: string;
};
