import CarouselPosts from "@/components/CarouselPosts";
import FeaturedPosts from "@/components/FeaturedPosts";

export default function HomePage() {
  return (
    // <div className="relative">
    //   <Main />
    //   <div className="absolute w-full top-2/3">
    //     <FeaturedPosts />
    //     <CarouselPosts />
    //   </div>
    // </div>
    <>
      <FeaturedPosts />
      <CarouselPosts />
    </>
  );
}
