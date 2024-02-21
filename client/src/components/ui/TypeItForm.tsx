"use client";
import TypeIt from "typeit-react";

export default function TypeItForm() {
  return (
    <TypeIt
      getBeforeInit={(instance) => {
        instance
          .type("Pretend until it’s true, you are a great devloper.")
          .break({ delay: 500 })
          .type(
            '<em class="text-xs">그것이 사실이 될 때까지 가장해라, 당신은 훌륭한 개발자다.</em>'
          )
          .go();
        // Remember to return it!
        return instance;
      }}
      options={{
        // strings: [
        //   "Pretend until it’s true, you are a great devloper.",
        //   "그것이 사실이 될 때까지 가장해라, 당신은 훌륭한 개발자다.",
        // ],
        speed: 50,
        waitUntilVisible: true,
        cursor: false,
        loop: true,
        breakLines: false,
        afterStep: (instance: any) => {
          instance.getElement().style.color = randomColor();
        },
      }}
    />
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
