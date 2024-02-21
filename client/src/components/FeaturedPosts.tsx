"use client";
import useSWR from "swr";
import PostsGrid from "./PostsGrid";
import Skeleton from "./ui/Skeleton";

export default function FeaturedPosts() {
  const { data: posts, isLoading: loading } = useSWR("/api/posts");

  return (
    <section className="px-12 py-4 mt-[6rem] flex flex-col">
      <span className="text-[#706f7a] mb-8 border-dashed text-center border-b border-gray-300 pb-4">
        블로그에 적용해본 기능이나 공부한 내용을 토대로 구현한 기능과
        트러블슈팅에 대한 내용을 정리합니다.
      </span>
      {loading && <Skeleton />}
      <PostsGrid posts={posts} />
    </section>
  );
}
