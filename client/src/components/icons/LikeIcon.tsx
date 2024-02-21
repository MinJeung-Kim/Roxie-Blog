import { AiOutlineLike } from "react-icons/ai";

type Props = {
  className?: string;
};

export default function LikeIcon({ className }: Props) {
  return <AiOutlineLike className={className} />;
}
