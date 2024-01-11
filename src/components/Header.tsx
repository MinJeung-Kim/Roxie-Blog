import Link from "next/link";
import Image from "next/image";
import profileImage from "../../public/images/profile.png";
import TypeItForm from "./ui/TypeItForm";

const HEADER_COLOR =
  "text-black hover:text-yellow-500 transition-colors duration-[0.3s] text-sm";
const HEADER =
  "fixed flex items-center justify-between w-full px-12 pt-[0.8rem] pb-[0.5rem] mx-auto z-[999] max-w-screen-2xl shadow-[3px_-1px_4px_0px_rgba(136,133,194,0.611)] bg-[#fff]";

export default function Header() {
  return (
    <header className={HEADER}>
      <Link href="/" className="flex items-center gap-2">
        <Image
          className="mx-auto rounded-full cursor-pointer"
          src={profileImage}
          alt="Picture of the author"
          width={40}
          height={40}
          priority
        />
        <h1 className={`flex flex-col text-base ${HEADER_COLOR}`}>
          <span className="leading-[1rem] font-bold text-sm">
            ROXIE
            <br />
            DEV
          </span>
        </h1>
      </Link>
      <div className="leading-3">
        <TypeItForm />
      </div>

      <nav className="flex gap-6">
        <Link href="/posts" className={HEADER_COLOR}>
          전체 게시글
        </Link>
        <Link href="/about" className={HEADER_COLOR}>
          개발자 소개
        </Link>
        <Link href="/contact" className={HEADER_COLOR}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
