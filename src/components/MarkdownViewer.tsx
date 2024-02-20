"use client";

import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DynamicImage = dynamic(() => import("next/image"), { ssr: false });
const MARKDOWN_CSS =
  "text-base prose backdrop:max-w-none lg:prose-xl lg:prose-code:text-[0.8rem] lg:prose-a:text-[#abab06] lg:prose-pre:p-3 lg:prose-h2:text-[2rem] lg:prose-h3:text-[1.5rem] lg:prose-p:text-[1rem] lg:prose-li:text-[1rem] lg:prose-span:text-[1rem] lg:prose-th:text-[1rem] lg:prose-td:text-[1rem] lg:prose-ol:mb-0 lg:prose-ul:mt-0";

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      // className="text-base prose backdrop:max-w-none lg:prose-xl lg:prose-code:text-[0.95rem] lg:prose-pre:p-3"
      className={MARKDOWN_CSS}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <>
              <div className="text-right language-label text-[0.7rem] font-bold text-[#a3a4a7]">
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
                  padding: 0,
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </>
          ) : (
            <code
              style={{
                backgroundColor: "lightgray",
                padding: "2px",
                borderRadius: "4px",
              }}
              {...props}
              className={className}
            >
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
