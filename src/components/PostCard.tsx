import { Post } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";

type Props = { post: Post };

export default function PostCard({
  post: { title, description, date, category, path },
}: Props) {
  const pathUrl = path.split("-")[0];

  return (
    <Link href={`/posts/${path}`}>
      <article className="overflow-hidden rounded-md shadow-md hover:shadow-xl">
        <Image
          className="w-full rounded-2xl"
          src={`/images/posts/${pathUrl}.png`}
          alt={title}
          width={300}
          height={200}
        />
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="flex items-center justify-between w-full">
            <span className="px-2 py-[0.15rem] my-2 text-[0.8rem] text-[#fff] bg-[#FF6666] rounded-xl">
              ɷ {category}
            </span>
            <time className="text-gray-500 text-[0.85rem]">
              {date.toString()}
            </time>
          </div>
          <h3 className="text-base">{title}</h3>
          {/* truncate  : 일정한 높이 지정*/}
          <p className="w-full text-[0.85rem] text-[#898888] text-center truncate">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}
