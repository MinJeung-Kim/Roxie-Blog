import { Metadata } from "next";
import path from "path";

import PostIndex from "@/components/PostIndex";
import PostContent from "@/components/PostContent";
import LikeIcon from "@/components/icons/LikeIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import AdjacentPostCard from "@/components/AdjacentPostCard";
import ShareSocialIcon from "@/components/icons/ShareSocialIcon";

import { markdownToToc } from "@/util/markdownToToc";
import { getFeaturedPosts, getPostData } from "@/service/posts";

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

const ICON_CLASS =
  "hover:text-yellow-500 transition-colors duration-[0.3s] cursor-pointer";

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { next, prev, date } = post;

  const toc = markdownToToc(
    path.join(process.cwd(), "data", "posts", `${post.path}.md`)
  );

  return (
    <div className="flex">
      <article className="pt-[5rem] m-12 mt-[5rem] overflow-hidden bg-gray-100 shadow-lg rounded-2xl">
        <PostContent post={post} />
        <section className="flex shadow-md mt-[2rem]">
          {prev && <AdjacentPostCard post={prev} type="prev" />}
          {next && <AdjacentPostCard post={next} type="next" />}
        </section>
      </article>
      <article className="min-w-[15rem] mt-[5rem] pt-[3rem] relative">
        <div className="w-[16%] fixed flex flex-col gap-4">
          <div className="flex items-center justify-between w-[60%] text-[1.5rem]">
            <LikeIcon className={ICON_CLASS} />
            <ShareSocialIcon className={ICON_CLASS} />
            <PencilIcon className={ICON_CLASS} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[0.8rem]"> 생성일: {date.toString()} </span>
            <span className="text-[0.8rem]"> 수정일: {date.toString()} </span>
          </div>

          <span className="font-semibold pb-[0.5rem] border-b border-[#e5e6e8]">
            목차
          </span>
          <ul className="flex flex-col gap-4 text-sm h-[50vh] overflow-auto">
            {toc.map((header) => (
              // header 객체의 모든 속성을 PostIndex 컴포넌트에 전달
              <PostIndex key={header.text} {...header} />
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}

// 원하는 슬러그에 한해서 페이지를 미리 만들어 둠.
export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
