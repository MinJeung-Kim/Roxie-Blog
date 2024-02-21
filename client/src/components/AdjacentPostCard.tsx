import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Post } from "@/model/post";

type Props = {
  post: Post;
  type: "prev" | "next";
};

const ICON_CLASS =
  "text-4xl m-4 text-yellow-300 transition-all group-hover:text-6xl";

export default function AdjacentPostCard({
  post: { id, title, description, image },
  type,
}: Props) {
  return (
    <Link href={`/posts/${id}`} className="relative w-full bg-black max-h-56">
      <Image
        className="w-full opacity-40"
        src={image}
        alt={title}
        width={150}
        height={100}
      />
      <div className="absolute flex items-center justify-around w-full px-8 text-white -translate-x-1/2 -translate-y-1/2 group top-1/2 left-1/2">
        {type === "prev" && <FaArrowLeft className={ICON_CLASS} />}
        <div className="w-full text-center">
          <span className="text-2xl font-bold">{title}</span>
          <span className="font-bold">{description}</span>
        </div>
        {type === "next" && <FaArrowRight className={ICON_CLASS} />}
      </div>
    </Link>
  );
}
