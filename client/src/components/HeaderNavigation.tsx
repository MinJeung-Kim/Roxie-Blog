"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GithubFillIcon from "./icons/GithubFillIcon";
import PencilIcon from "./icons/PencilIcon";

const NAV_CLASS = "text-sm";
const NAV_HOVER_CLASS =
  "text-black hover:text-yellow-500 transition-colors duration-[0.3s]";
const POINT_COLOR = "text-yellow-500";

export default function HeaderNavigation() {
  const pathname = usePathname().split("/")[1];

  return (
    <nav className="flex items-center gap-6">
      <Link
        href="/posts"
        className={`${NAV_CLASS} ${NAV_HOVER_CLASS} ${
          pathname === "posts" && POINT_COLOR
        }`}
      >
        전체 게시글
      </Link>
      <Link
        href="/about"
        className={`${NAV_CLASS} ${NAV_HOVER_CLASS} ${
          pathname === "about" && POINT_COLOR
        }`}
      >
        개발자 소개
      </Link>
      <Link
        href="https://github.com/MinJeung-Kim/Roxie-Blog"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[1.58rem] ${NAV_HOVER_CLASS}`}
      >
        <GithubFillIcon />
      </Link>
      <Link href="/editor" className={`text-[1.58rem] ${NAV_HOVER_CLASS}`}>
        <PencilIcon />
      </Link>
      {/* <Link href="/contact" className={NAV_CLASS}>
  Contact
</Link> */}
    </nav>
  );
}
