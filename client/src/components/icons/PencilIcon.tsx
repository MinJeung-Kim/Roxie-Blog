import { TbPencil } from "react-icons/tb";

type Props = {
  className?: string;
};

export default function PencilIcon({ className }: Props) {
  return <TbPencil className={className} />;
}
