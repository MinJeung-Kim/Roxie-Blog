"use client";
import Image from "next/image";
import TypeIt from "typeit-react";
import mainImage from "../../public/images/mainBg.png";

export default function Main() {
  return (
    <div className="relative">
      <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-transparent to-black"></div>
      <Image
        className="w-full"
        src={mainImage}
        alt="Picture of the author"
        //   width={30}
        //   height={30}
        priority
      />
      <div className="absolute top-60 left-[18%] text-[#fcfc2d] text-[5rem] bg-[#dcdcdc66]">
        <TypeIt
          getBeforeInit={(instance) => {
            instance.go();
            // Remember to return it!
            return instance;
          }}
          options={{
            strings: "Fake it till you make it.",
            cursor: false,
            loop: true,
            breakLines: false,
            afterStep: (instance: any) => {
              instance.getElement().style.color = randomColor();
            },
          }}
        ></TypeIt>
      </div>
    </div>
  );
}
function randomColor() {
  // 간단한 색상 코드 생성
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
