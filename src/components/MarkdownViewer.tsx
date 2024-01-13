"use client";

import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="prose text-black max-w-none lg:prose-xl"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
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
          <figure>
            <DynamicImage
              className="w-full max-h-[50rem] object-cover"
              src={src || ""}
              alt={alt || ""}
              // layout="fill"
              width={500}
              height={350}
              // layout="responsive"
            />
            {title && (
              <figcaption className="text-center figcaption-class text-slate-400 text-[0.6rem]">
                ɷ {title}
              </figcaption>
            )}
          </figure>
        ),
      }}
      unwrapDisallowed={true}
    >
      {content}
    </ReactMarkdown>
  );
}
