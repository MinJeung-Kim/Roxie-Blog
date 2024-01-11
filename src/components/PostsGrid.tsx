import { Post } from "@/service/posts";
import PostCard from "./PostCard";

type Props = { posts: Post[] };

export default function PostsGrid({ posts }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* <ul className="flex flex-wrap gap-6"> */}
      {posts.map((post) => (
        <li key={post.path}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
