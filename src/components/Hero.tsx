"use client";
import Link from "next/link";
import Image from "next/image";

import CopyIcon from "./icons/CopyIcon";
import ExportIcon from "./icons/ExportIcon";
import profileImage from "../../public/images/profile.png";

// priority : 제일먼저 다운받아서 보여질 dom.
export default function Hero() {
  const textToCopy = "focso5@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log(textToCopy);

      alert("텍스트가 클립보드에 복사되었습니다!");
    } catch (err) {
      // alert("복사에 실패했습니다: ", err);
    }
  };

  return (
    <section className="flex items-center justify-center gap-[1.8rem]">
      <Image
        className="rounded-full"
        src={profileImage}
        alt="Picture of the author"
        width={250}
        height={250}
        priority
      />
      <div className="flex flex-col items-start gap-[0.5rem]">
        <h2 className="mb-4 text-5xl">김민정</h2>
        <h2 className="text-2xl font-semibold">ROXIE (록시)</h2>
        <h3 className="text-2xl font-semibold">Front-End Engineer</h3>
        <div className="mt-4 flex flex-col gap-[0.2rem]">
          <div className="flex items-center gap-1 " onClick={handleCopy}>
            <span className="text-[#494d50] text-sm hover:text-yellow-500">
              {textToCopy}
            </span>
            <CopyIcon />
          </div>

          <Link
            href="https://github.com/MinJeung-Kim"
            className="flex items-center gap-1 hover:underline "
          >
            <span className="text-[#494d50] text-sm hover:text-yellow-500">
              깃헙: MinJeung-Kim
            </span>
            <ExportIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
