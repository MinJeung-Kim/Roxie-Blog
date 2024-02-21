import { BiSearchAlt } from "react-icons/bi";

type Props = {
  className?: string;
};

export default function SearchIcon({ className }: Props) {
  return <BiSearchAlt size="25" className={className} />;
}
