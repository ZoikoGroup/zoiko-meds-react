"use client";

interface Props {
  content: string;
}

export default function MessageText({ content }: Props) {
  return (
    <div style={{ fontSize: "13.5px", lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {content}
    </div>
  );
}
