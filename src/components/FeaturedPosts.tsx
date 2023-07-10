import { getFeaturedPosts } from "@/service/posts";
import PostsGrid from "./PostsGrid";

export default async function FeaturedPosts() {
  // 1. 모든 포스트 데이터를 읽어와야 함
  //   - 비즈니스 로직은 컴포넌트에서 복잡한 로직을 담는것은 지양.
  //     => service 경로에서 생성하여 불러오기.
  const posts = await getFeaturedPosts();
  // 2. 모든 포스트 데이터를 보여줌.
  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold my-2">Featured Posts</h2>
      <PostsGrid posts={posts}/>
    </section>
  );
}
