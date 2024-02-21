import PostEdit from "@/components/PostEdit";
import MarkdownEditor from "@/components/ui/MarkdownEditor";

export default function EditorPage() {
  return (
    <div className="flex flex-col text-[2rem] gap-4 px-12 mt-28">
      <h1>{`Create new page`}</h1>
      <PostEdit />
    </div>
  );
}
