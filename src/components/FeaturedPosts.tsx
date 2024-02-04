"use client";
import useSWR from "swr";
import PostsGrid from "./PostsGrid";
import Skeleton from "./ui/Skeleton";

export default function FeaturedPosts() {
  const { data: posts, isLoading: loading } = useSWR("/api/posts");

  return (
    <section className="px-12 py-4 mt-[6rem]">
      <h2 className="my-2 text-3xl font-medium">최신 게시글 🌟</h2>
      <p className="text-[#706f7a] mb-8">
        최근 블로그에 적용해본 기능이나 공부한 내용을 토대로 실습한 기능에 대한
        내용을 정리합니다.
      </p>
      {loading && <Skeleton />}
      <PostsGrid posts={posts} />
    </section>
  );
}
