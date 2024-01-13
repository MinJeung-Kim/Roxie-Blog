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
    <section className="flex items-center justify-between gap-[1.8rem] py-8 px-[5rem]">
      <div className="flex flex-col items-start gap-[0.5rem]">
        <div className="flex items-end gap-4">
          <h2 className="mb-1 text-5xl">김민정</h2>
          <h2 className="text-3xl font-semibold">ROXIE (록시)</h2>
        </div>

        <h3 className="text-2xl font-semibold text-[#787e83]">
          Front-End Engineer
        </h3>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-1 " onClick={handleCopy}>
            <span className="text-[#494d50] text-lg">{textToCopy}</span>
            <CopyIcon />
          </div>

          <Link
            href="https://github.com/MinJeung-Kim"
            className="flex items-center gap-1 hover:underline hover:decoration-yellow-500 hover:underline-offset-4"
          >
            <span className="text-[#494d50] text-lg hover:text-yellow-500">
              깃헙: https://github.com/MinJeung-Kim
            </span>
            <ExportIcon />
          </Link>
        </div>
      </div>
      <Image
        className="rounded-full"
        src={profileImage}
        alt="Picture of the author"
        width={185}
        height={185}
        priority
      />
    </section>
  );
}
