import { Metadata } from "next";

import PostToc from "@/components/PostToc";
import EyeIcon from "@/components/icons/EyeIcon";
import PostContent from "@/components/PostContent";
import LikeIcon from "@/components/icons/LikeIcon";
import AdjacentPostCard from "@/components/AdjacentPostCard";
import ShareSocialIcon from "@/components/icons/ShareSocialIcon";

import { dateFormat } from "@/util/dateFormat";
import { Post, getFeaturedPosts, getPostData } from "@/service/posts";

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
  const { next, prev, createdAt, updatedAt } = post;

  return (
    <div className="flex justify-center pl-8 pr-12">
      <article className="pt-[5rem] px-6 m-12 mt-[5rem] overflow-hidden bg-gray-100 shadow-lg rounded-2xl">
        <PostContent post={post} />
        <section className="flex shadow-md mt-[2rem] overflow-hidden">
          {prev && <AdjacentPostCard post={prev} type="prev" />}
          {next && <AdjacentPostCard post={next} type="next" />}
        </section>
      </article>
      <article className="min-w-[15rem] mt-[5rem] pt-[3rem] relative">
        <div className="w-[17%] h-full fixed flex flex-col gap-4">
          <div className="flex items-center justify-between w-[60%] text-[1.5rem]">
            <LikeIcon className={ICON_CLASS} />
            <EyeIcon className={ICON_CLASS} />
            <ShareSocialIcon className={ICON_CLASS} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[0.8rem]">
              생성일: {dateFormat(createdAt)}
            </span>
            <span className="text-[0.8rem]">
              수정일: {dateFormat(updatedAt)}
            </span>
          </div>

          <span className="font-semibold pb-[0.5rem] border-b border-[#e5e6e8]">
            목차
          </span>
          <PostToc />
        </div>
      </article>
    </div>
  );
}

// 원하는 슬러그에 한해서 페이지를 미리 만들어 둠.
export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post: Post) => ({
    slug: post.path,
  }));
}
