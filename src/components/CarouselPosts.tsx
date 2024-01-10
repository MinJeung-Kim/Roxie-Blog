import { getNonFeaturedPosts } from "@/service/posts";
import PostCard from "./PostCard";
import MultiCarousel from "./MultiCarousel";

export default async function CarouselPosts() {
  const posts = await getNonFeaturedPosts();
  return (
    <section className="px-12 py-4 mt-4">
      <h2 className="my-2 text-3xl font-medium">추천 글💡</h2>
      <MultiCarousel>
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </MultiCarousel>
    </section>
  );
}
