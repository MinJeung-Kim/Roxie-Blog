import { getNonFeaturedPosts } from "@/service/posts";
import PostCard from "./PostCard";
import MultiCarousel from "./MultiCarousel";

export default async function CarouselPosts() {
  const posts = await getNonFeaturedPosts();
  return (
    <section className="px-12 py-4 mt-[5rem]">
      <h2 className="my-2 text-3xl font-medium">추천 게시글💡</h2>
      <p className="text-[#706f7a] mb-8">
        최신 트렌드에 연관된 글을 추천합니다.
      </p>
      <MultiCarousel>
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </MultiCarousel>
    </section>
  );
}
