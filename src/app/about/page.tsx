import Hero from "@/components/Hero";
import { Metadata } from "next";
import Link from "next/link";
import { FiExternalLink } from 'react-icons/fi';

export const metadata: Metadata = {
  title: "About Me",
  description: "Roxie 커리어 소개",
};

const TITLE_CLASS = "text-2xl font-bold text-gray-800 my-2";

export default function AboutPage() {
  return (
    <>
      <Hero />
      <section className="bg-gray-100 shadow-lg p-8 m-8 text-center">
        <h2 className={TITLE_CLASS}>🙋‍♀️Who Am I?</h2>
        <p>
          개발을 사랑하는 프론트 개발자 <br />
          사람과 디자인을 담는 웹을 만들고 있습니다.
        </p>
        <h2 className={TITLE_CLASS}>💻Career</h2>
        <p>
          린아레나 R&D팀 (-Now) <br />
          유니윌지점 위즈페이 R&D팀 (-2022) <br />
          이지팜 R&D팀 (-2017) <br />
          이젠에듀 컨텐츠 디자인팀(-2016)
        </p>
        <h2 className={TITLE_CLASS}>🛠️Skills</h2>
        <p>
          JavaScript, TypeScript, CSS, HTML <br />
          React, Vue, NextJs <br />
          Git, Clean Code <br />
          VS Code, Intellij, MongoDB
        </p>
        <h2 className={TITLE_CLASS}>📃Cover Letter</h2>
        <Link href="https://www.notion.so/roxiedev/Cover-Letter-b9deac9efa294d2ca1596dbd07c05dd4?pvs=4">
          <p className="flex items-center justify-center underline text-sky-600">바로가기<FiExternalLink/></p>
        </Link>
      </section>
    </>
  );
}
