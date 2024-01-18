"use client";
import React, { useState, useEffect } from "react";
import { getIntersectionObserver } from "@/util/getIntersectionObserver";

export default function PostToc() {
  const [currentId, setCurrentId] = useState<string>("");
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

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
  }, []);

  return (
    <ul className="overflow-auto h-2/4">
      {headingEls.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={currentId === heading.id ? "text-yellow-500" : "text-sm"}
          >
            {heading.textContent}
          </a>
        </li>
      ))}
    </ul>
  );
}
