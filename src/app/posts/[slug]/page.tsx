import { Metadata } from "next";
import { getFeaturedPosts, getPostData } from "@/service/posts";
import AdjacentPostCard from "@/components/AdjacentPostCard";
import PostContent from "@/components/PostContent";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title, description } = await getPostData(slug);
  return {
    title,
    description,
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { next, prev } = post;

  return (
    <article className="pt-[5rem] m-12 mt-[5rem] overflow-hidden bg-gray-100 shadow-lg rounded-2xl">
      <PostContent post={post} />
      <section className="flex shadow-md mt-[2rem]">
        {prev && <AdjacentPostCard post={prev} type="prev" />}
        {next && <AdjacentPostCard post={next} type="next" />}
      </section>
    </article>
  );
}

// 원하는 슬러그에 한해서 페이지를 미리 만들어 둠.
export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
