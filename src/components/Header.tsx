import Link from "next/link";
import Image from "next/image";
import logoImage from "../../public/images/logo.png";
import TypeItForm from "./ui/TypeItForm";
import GithubFillIcon from "./icons/GithubFillIcon";

const NAV_CLASS = "text-sm";
const NAV_HOVER_CLASS =
  "text-black hover:text-yellow-500 transition-colors duration-[0.3s]";
const HEADER_CLASS =
  "fixed flex items-center justify-between w-full px-12 pt-[0.8rem] pb-[0.5rem] mx-auto z-[999] max-w-screen-2xl shadow-[3px_-1px_4px_0px_rgba(136,133,194,0.611)] bg-[#fff]";

export default function Header() {
  return (
    <header className={HEADER_CLASS}>
      <Link href="/" className="flex items-center gap-2">
        <Image
          className="mx-auto rounded-full cursor-pointer"
          src={logoImage}
          alt="Picture of the author"
          width={40}
          height={40}
          priority
        />
        <h1 className={`flex flex-col text-base ${NAV_HOVER_CLASS}`}>
          <span className="leading-[1rem] font-bold text-sm">
            ROXIE
            <br />
            DEV
          </span>
        </h1>
      </Link>
      <div className="leading-[0.5rem]">
        <TypeItForm />
      </div>

      <nav className="flex items-center gap-6">
        <Link href="/posts" className={`${NAV_CLASS} ${NAV_HOVER_CLASS}`}>
          전체 게시글
        </Link>
        <Link href="/about" className={`${NAV_CLASS} ${NAV_HOVER_CLASS}`}>
          개발자 소개
        </Link>
        <Link
          href="https://github.com/MinJeung-Kim"
          className={`text-[1.58rem] ${NAV_HOVER_CLASS}`}
        >
          <GithubFillIcon />
        </Link>
        {/* <Link href="/contact" className={NAV_CLASS}>
          Contact
        </Link> */}
      </nav>
    </header>
  );
}
