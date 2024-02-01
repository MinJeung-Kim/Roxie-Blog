"use client";
import useSWR from "swr";
import PostsGrid from "./PostsGrid";

export default function FeaturedPosts() {
  // 1. 모든 포스트 데이터를 읽어와야 함
  //   - 비즈니스 로직은 컴포넌트에서 복잡한 로직을 담는것은 지양.
  //     => service 경로에서 생성하여 불러오기.
  // const posts = await getFeaturedPosts();
  // 2. 모든 포스트 데이터를 보여줌.
  const { data: posts, isLoading: loading } = useSWR("/api/posts");

  return (
    <section className="px-12 py-4 mt-[6rem]">
      <h2 className="my-2 text-3xl font-medium">최신 게시글 🌟</h2>
      <p className="text-[#706f7a] mb-8">
        최근 블로그에 적용해본 기능이나 공부한 내용을 토대로 실습한 기능에 대한
        내용을 정리합니다.
      </p>
      <PostsGrid posts={posts} />
    </section>
  );
}
