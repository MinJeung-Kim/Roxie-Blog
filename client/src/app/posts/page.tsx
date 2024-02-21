import FilterablePosts from "@/components/FilterablePosts";
import { Post } from "@/model/post";
import { getAllPosts } from "@/service/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
  description: "개발 관련 블로그 글",
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [
    ...new Set(posts.map((post: Post) => post.category) as string[]),
  ];
  return <FilterablePosts posts={posts} categories={categories} />;
}
