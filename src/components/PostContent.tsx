import { AiTwotoneCalendar } from "react-icons/ai";
import { PostData } from "@/service/posts";
import MarkdownViewer from "./MarkdownViewer";

export default function PostContent({ post }: { post: PostData }) {
  const { title, description, date, content } = post;
  return (
    <section className="flex flex-col p-4">
      <div className="flex items-center self-end text-sky-600">
        <AiTwotoneCalendar />
        <p className="ml-2 font-semibold">{date.toString()}</p>
      </div>

      <h1 className="mb-4 text-4xl">{title}</h1>
      <p className="text-[1rem] text-[#929292]">{description}</p>
      <div className="mt-4 mb-8 border-2 w-44 border-sky-600" />
      <MarkdownViewer content={content} />
    </section>
  );
}
