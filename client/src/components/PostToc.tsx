"use client";
import React, { useState, useEffect } from "react";
import { getIntersectionObserver } from "@/util/getIntersectionObserver";

export default function PostToc() {
  const [currentId, setCurrentId] = useState<string>("");
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  const applyPadding = (element: string) => {
    switch (element) {
      case "h3":
        return "pl-4";
      case "h4":
        return "pl-8";
      case "h5":
        return "pl-12";
      case "h6":
        return "pl-16";

      default:
        return "";
    }
  };

  // h2, h3 요소 추출
  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    setHeadingEls(headingElements);

    headingElements.map((header) => {
      observer.observe(header);
    });

    // 클린업 함수는 메모리 누수를 방지
    return () => {
      headingElements.forEach((header) => {
        observer.unobserve(header);
      });
    };
  }, []);

  return (
    <ul className="overflow-auto h-2/4">
      {headingEls.map((heading) => {
        return (
          <li key={heading.id} className={applyPadding(heading.localName)}>
            <a
              href={`#${heading.id}`}
              className={`text-[0.85rem] ${
                currentId === heading.id && "text-yellow-500"
              }`}
            >
              {heading.textContent}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
