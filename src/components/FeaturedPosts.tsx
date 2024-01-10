import { getFeaturedPosts } from "@/service/posts";
import PostsGrid from "./PostsGrid";

export default async function FeaturedPosts() {
  // 1. 모든 포스트 데이터를 읽어와야 함
  //   - 비즈니스 로직은 컴포넌트에서 복잡한 로직을 담는것은 지양.
  //     => service 경로에서 생성하여 불러오기.
  const posts = await getFeaturedPosts();
  // 2. 모든 포스트 데이터를 보여줌.
  return (
    <section className="px-12 py-4 mt-4">
      <h2 className="my-2 text-3xl font-medium">최신 글 🌟</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
