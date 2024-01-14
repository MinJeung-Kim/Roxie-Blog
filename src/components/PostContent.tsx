import Image from "next/image";
import { PostData } from "@/service/posts";
import MarkdownViewer from "./MarkdownViewer";

export default function PostContent({ post }: { post: PostData }) {
  const { title, path, description, content } = post;
  const pathUrl = path.split("-")[0];

  return (
    <section className="flex flex-col px-20 py-4">
      <h1 className="mb-4 text-4xl">{title}</h1>
      <p className="text-[1rem] text-[#929292]">{description}</p>
      <div className="mt-4 mb-8 border-2 w-44 border-sky-600" />

      {/* h-1/5 : 화면의 5분의1 */}
      <Image
        className="w-full h-1/5 max-h-[500px] rounded-2xl mb-7"
        src={`/images/posts/${pathUrl}.png`}
        alt={title}
        width={760}
        height={420}
      />

      <MarkdownViewer content={content} />
    </section>
  );
}
