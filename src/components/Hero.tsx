import Image from "next/image";
import profileImage from "../../public/images/profile.png";
import Link from "next/link";
import { BiGitBranch } from "react-icons/bi";
// Hero
// 웹사이트에서 처음으로 보여지는 콘텐츠
// 웹페이지를 상징할 수 있는 콘텐츠

// priority : 제일먼저 다운받아서 보여질 dom.
export default function Hero() {
  return (
    <section className="text-center">
      <Image
        className="rounded-full mx-auto"
        src={profileImage}
        alt="Picture of the author"
        width={250}
        height={250}
        priority
      />
      <h2 className="text-3xl font-bold mt-2">{"Hi, I'm Roxie"}</h2>
      <h3 className="text-xl font-semibold">Front-End Engineer</h3>
      <Link href="https://github.com/MinJeung-Kim">
        <p className="flex justify-center items-center text-blue-800 underline">
          <BiGitBranch /> MinJeung-Kim
        </p>
      </Link>
      <Link href="/contact">
        <button className="bg-yellow-500 font-bold rounded-xl py-1 px-4 mt-2">
          Contact Me
        </button>
      </Link>
    </section>
  );
}
