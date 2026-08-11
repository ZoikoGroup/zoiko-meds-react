"use client";

import React from "react";

interface Props {
  content: string;
}

function parseMarkdownLinksAndUrls(text: string): React.ReactNode[] {
  const regex = /\[([^\]]+)\]\(([^\s)]+)\)|(https?:\/\/[^\s<>\,\"\']+)|((?:[a-zA-Z0-9-]+\.)*zoikomeds\.com\/[^\s<>\,\"\']*|\bwww\.[^\s<>\,\"\']+)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      const label = match[1];
      const rawUrl = match[2];
      let href = rawUrl;
      if (!href.startsWith("http://") && !href.startsWith("https://") && !href.startsWith("/")) {
        href = "https://" + href;
      }
      const isExternal = href.startsWith("http");
      elements.push(
        <a
          key={match.index}
          href={href}
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
    } else if (match[3] || match[4]) {
      let url = match[3] || match[4];
      let trailingPunct = "";
      const punctMatch = url.match(/[.,!?;:]+$/);
      if (punctMatch) {
        trailingPunct = punctMatch[0];
        url = url.slice(0, -trailingPunct.length);
      }
      let href = url;
      if (!href.startsWith("http://") && !href.startsWith("https://") && !href.startsWith("/")) {
        href = "https://" + href;
      }
      elements.push(
        <a
          key={match.index}
          href={href}
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
      if (trailingPunct) {
        elements.push(trailingPunct);
      }
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

