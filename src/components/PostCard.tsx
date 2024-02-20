import Link from "next/link";
import Image from "next/image";
import { Post } from "@/model/post";
import { dateFormat } from "@/util/dateFormat";

type Props = { post: Post };

export default function PostCard({
  post: { title, description, createdAt, category, id, image },
}: Props) {
  return (
    <Link href={`/posts/${id}`}>
      <article className="overflow-hidden rounded-md hover:shadow-xl min-h-[338px]">
        <Image
          className="object-cover w-full h-40 select-none rounded-2xl"
          src={image}
          alt={`photo by ${title}`}
          width={300}
          height={200}
          priority
        />
        <div className="flex flex-col items-start gap-2 p-4">
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center h-6 px-2 text-[0.7rem] text-[#fff] bg-[#FF6666] rounded-xl tracking-[0.5px]">
              ɷ {category}
            </span>
            <time className="text-gray-500 text-[0.75rem]">
              {dateFormat(createdAt)}
            </time>
          </div>
          <h3
            className="text-[1.1rem] text-[#383d4e] font-semibold"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
            title={title}
          >
            {title}
          </h3>
          <span
            className="w-full text-[0.85rem] text-[#79838b] text-left truncate whitespace-normal leading-5"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
              overflow: "hidden",
              wordBreak: "keep-all",
            }}
          >
            {description}
          </span>
        </div>
      </article>
    </Link>
  );
}
