import Link from "next/link";
import Image from "next/image";
import TypeItForm from "./ui/TypeItForm";
import logoImage from "../../public/images/logo.png";
import HeaderNavigation from "./HeaderNavigation";

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
        <div className={`flex flex-col text-base ${NAV_HOVER_CLASS}`}>
          <span className="leading-[1rem] font-bold text-sm">
            ROXIE.
            <br />
            DEV
          </span>
        </div>
      </Link>
      <div className="leading-[0.5rem]">
        <TypeItForm />
      </div>
      <HeaderNavigation />
    </header>
  );
}
