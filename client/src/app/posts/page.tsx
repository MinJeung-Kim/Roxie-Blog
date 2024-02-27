import FilterablePosts from "@/components/FilterablePosts";
import { Post } from "@/model/post";
import HttpClient from "@/network/http";
import PostService from "@/service/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
  description: "개발 관련 블로그 글",
};

const baseURL = process.env.REACT_APP_BASE_RUL;
const httpClient = new HttpClient(baseURL || "");
const postService = new PostService(httpClient);

export default async function PostsPage() {
  const posts = await postService.getPosts();
  const categories = [
    ...new Set(posts.map((post: Post) => post.category) as string[]),
  ];
  return <FilterablePosts posts={posts} categories={categories} />;
}
