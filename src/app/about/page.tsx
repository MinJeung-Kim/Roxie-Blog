import { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ExportIcon from "@/components/icons/ExportIcon";

export const metadata: Metadata = {
  title: "About Me",
  description: "Roxie's 커리어 소개",
};

const TITLE_CLASS = "text-2xl font-bold text-gray-800 min-w-[13rem]";
const CONTENT_CLASS = "flex items-center gap-3";
const UL_CLASS = "flex flex-col";
const BORDER_CLASS = "border-b border-gray-200 pb-[0.8rem]";

export default function AboutPage() {
  return (
    <div className="flex w-full justify-between items-center mt-[7rem] px-[8rem]">
      <Hero />
      <section className="w-[65%] flex flex-col gap-4 px-8 py-12 bg-gray-100 shadow-lg">
        <div className={`${CONTENT_CLASS} ${BORDER_CLASS}`}>
          <h2 className={TITLE_CLASS}>🙋‍♀️Who Am I?</h2>
          <ul className={UL_CLASS}>
            개발을 사랑하는 프론트 개발자 <br />
            사람과 디자인을 담는 웹을 만들고 있습니다.
          </ul>
        </div>
        <div className={`${CONTENT_CLASS} ${BORDER_CLASS}`}>
          <h2 className={TITLE_CLASS}>💻Career</h2>
          <ul className={UL_CLASS}>
            린아레나 R&D팀 (-Now) <br />
            유니윌지점 위즈페이 R&D팀 (-2022) <br />
            이지팜 R&D팀 (-2017) <br />
            이젠에듀 컨텐츠 디자인팀(-2016)
          </ul>
        </div>
        <div className={`${CONTENT_CLASS} ${BORDER_CLASS}`}>
          <h2 className={TITLE_CLASS}>🛠️Skills</h2>
          <ul className={UL_CLASS}>
            JavaScript, TypeScript, CSS, HTML <br />
            React, Vue, NextJs <br />
            GitHub, Clean Code <br />
            VS Code, MongoDB
          </ul>
        </div>
        <div className={CONTENT_CLASS}>
          <h2 className={TITLE_CLASS}>📃Cover Letter</h2>
          <Link href="https://www.notion.so/roxiedev/Cover-Letter-b9deac9efa294d2ca1596dbd07c05dd4?pvs=4">
            <p className="flex items-center justify-center underline text-sky-600">
              바로가기
              <ExportIcon />
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
