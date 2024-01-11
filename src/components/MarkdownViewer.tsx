"use client";

import Image from "next/image";
import remarkGfm from "remark-gfm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="prose text-black max-w-none lg:prose-xl"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <>
              <div className="text-right language-label text-[0.85rem] font-bold text-[#a3a4a7]">
                {match[1].toUpperCase()}
              </div>
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...props}
                style={coldarkDark}
                showLineNumbers={true}
                lineNumberStyle={{ color: "#888", minWidth: "2em" }}
                customStyle={{
                  background: undefined,
                  color: undefined,
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        img: ({ src, alt, title }) => (
          <figure className="figure-class">
            <Image
              className="w-full max-h-[50rem] object-cover"
              src={src || ""}
              alt={alt || ""}
              width={500}
              height={350}
            />
            {title && (
              <figcaption className="text-center figcaption-class text-slate-400 text-[0.6rem]">
                ɷ {title}
              </figcaption>
            )}
          </figure>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
