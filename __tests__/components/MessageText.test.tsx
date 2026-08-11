import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageText from "@/components/zoi/MessageText";

describe("MessageText component", () => {
  it("renders markdown links [label](url) as clickable <a> elements", () => {
    render(
      <MessageText content="You can search directly at [zoikomeds.com/searchmed](https://zoikomeds.com/searchmed) for availability." />
    );

    const link = screen.getByRole("link", { name: "zoikomeds.com/searchmed" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://zoikomeds.com/searchmed");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders bare URLs as clickable <a> elements", () => {
    render(
      <MessageText content="Visit https://zoikomeds.com/searchmed to locate pharmacies." />
    );

    const link = screen.getByRole("link", { name: "https://zoikomeds.com/searchmed" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://zoikomeds.com/searchmed");
  });

  it("renders domain-only text like zoikomeds.com/searchmed as clickable <a> elements", () => {
    render(
      <MessageText content="To get started, you can visit our search page at zoikomeds.com/searchmed and enter the name of the medicine." />
    );

    const link = screen.getByRole("link", { name: "zoikomeds.com/searchmed" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://zoikomeds.com/searchmed");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
