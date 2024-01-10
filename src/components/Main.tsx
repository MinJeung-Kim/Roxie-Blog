"use client";
import Image from "next/image";
import TypeIt from "typeit-react";
import mainImage from "../../public/images/mainBg.png";

export default function Main() {
  return (
    <div className="relative">
      <Image
        className="w-full opacity-[50%]"
        src={mainImage}
        alt="Picture of the author"
        //   width={30}
        //   height={30}
        priority
      />
      <div className="absolute top-80 left-[18%] text-[#fcfc2d] text-[5rem]">
        <TypeIt
          getBeforeInit={(instance) => {
            instance.go();
            // Remember to return it!
            return instance;
          }}
          options={{
            strings: "Fake it till you make it.",
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
