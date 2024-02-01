import { MdOutlineRemoveRedEye } from "react-icons/md";

type Props = {
  className?: string;
};

export default function EyeIcon({ className }: Props) {
  return <MdOutlineRemoveRedEye className={className} />;
}
