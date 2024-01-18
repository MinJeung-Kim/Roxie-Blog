import { Dispatch, SetStateAction } from "react";

const observerOption = {
  root: null,
  rootMargin: "0px 0px 40% 0px",
  threshold: 1.0,
};

export const getIntersectionObserver = (
  setState: Dispatch<SetStateAction<string>>
) => {
  let prevYposition = 0;

  // scroll 방향 check function
  const checkScrollDirection = (prevY: number) => {
    if (window.scrollY === 0 && prevY === 0) return;

    prevYposition = window.scrollY;
  };

  // observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      checkScrollDirection(prevYposition);

      setState(entry.target.id);
    });
  }, observerOption);

  return observer;
};

// 참고
// https://thisyujeong.dev/blog/toc-generator
// https://bluemiv.tistory.com/13
// https://velog.io/@real-bird/ChatGPT%EA%B0%80-%EC%95%8C%EB%A0%A4%EC%A4%80-Intersection-Observer%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-ToC-%EC%BD%94%EB%93%9C
