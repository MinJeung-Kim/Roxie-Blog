export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  path: string;
  title: string;
};

// Intersection Type
export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};
