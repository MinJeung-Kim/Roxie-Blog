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
      <div className="absolute top-80 left-1/4 text-[#fcfc2d] text-[5rem]">
        <TypeIt
          getBeforeInit={(instance) => {
            instance
              .type("interactive")
              .pause(600)
              .delete(11)
              .type("bespoke")
              .pause(600)
              .delete(7)
              .type("accessible")
              .pause(600)
              .delete(11)
              .type("reactive")
              .pause(600)
              .delete(8)
              .type("engaging")
              .pause(600)
              .delete(8)
              .type("intentional")
              .pause(600)
              .delete(11)
              .type("fun")
              .pause(600)
              .delete(3)
              .type("lovely")
              .pause(600)
              .delete(6)
              .pause(600)
              .type("interactive");
            // Remember to return it!
            return instance;
          }}
          options={{
            cursor: false,
            waitUntilVisible: true,
            loop: true,
          }}
        ></TypeIt>
      </div>
    </div>
  );
}
