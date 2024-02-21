import Image from "next/image";
import MarkdownViewer from "./MarkdownViewer";
import { PostData } from "@/model/post";

export default function PostContent({ post }: { post: PostData }) {
  const { title, description, content, image } = post;

  return (
    <section className="flex flex-col px-20 py-4">
      <span className="mb-4 text-4xl">{title}</span>
      <span className="text-[1rem] text-[#929292]">{description}</span>
      <div className="mt-4 mb-8 border-2 w-44 border-sky-600" />

      {/* h-1/5 : 화면의 5분의1 */}
      <Image
        className="w-full h-1/5 max-h-[500px] rounded-2xl mb-7"
        src={image}
        alt={title}
        width={760}
        height={420}
        priority
      />
      <MarkdownViewer content={content} />
    </section>
  );
}
