import CarouselPosts from "@/components/CarouselPosts";
import FeaturedPosts from "@/components/FeaturedPosts";
import Main from "@/components/Main";

export default function HomePage() {
  return (
    <div className="relative">
      <Main />
      <div className="absolute top-2/3">
        <FeaturedPosts />
        <CarouselPosts />
      </div>
    </div>
  );
}
