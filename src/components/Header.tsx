import Link from "next/link";
import Image from "next/image";
import SearchIcon from "./icons/SearchIcon";
import profileImage from "../../public/images/profile.png";

export default function Header() {
  return (
    <header className="fixed flex items-center justify-between w-full px-12 py-4 mx-auto z-[999] max-w-screen-2xl">
      <nav className="flex gap-4">
        <Link href="/about">About</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link href="/">
        <h1 className="text-2xl">{"Roxie's Blog"}</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Image
          className="mx-auto rounded-full cursor-pointer"
          src={profileImage}
          alt="Picture of the author"
          width={30}
          height={30}
          priority
        />
        <SearchIcon className="cursor-pointer" />
      </div>
    </header>
  );
}
