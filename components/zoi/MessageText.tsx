"use client";

import React from "react";

interface Props {
  content: string;
}

function parseMarkdownLinksAndUrls(text: string): React.ReactNode[] {
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)|(https?:\/\/[^\s<>\,\"\']+)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      const label = match[1];
      const url = match[2];
      const isExternal = url.startsWith("http");
      elements.push(
        <a
          key={match.index}
          href={url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          style={{
            color: "#008882",
            fontWeight: 600,
            textDecoration: "underline",
            wordBreak: "break-all",
          }}
        >
          {label}
        </a>
      );
    } else if (match[3]) {
      const url = match[3];
      elements.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#008882",
            fontWeight: 600,
            textDecoration: "underline",
            wordBreak: "break-all",
          }}
        >
          {url}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}

export default function MessageText({ content }: Props) {
  return (
    <div style={{ fontSize: "13.5px", lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {parseMarkdownLinksAndUrls(content)}
    </div>
  );
}

