import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SSORequirementsFormSection from "@/components/sso-requirement/SSORequirementsFormSection";
import ShareContextFormSection from "@/components/talk-to-sales/ShareContextFormSection";

/**
 * Step navigation must never submit these 5-step forms.
 *
 * The regression: "Continue" and "Submit" sit in the same slot of the same
 * parent with no key, so React reused one DOM node and flipped its `type` from
 * "button" to "submit" during the very click that advanced to step 5 — the
 * browser then activated a submit button and posted the form.
 */

/** framer-motion's whileInView needs this; jsdom has no implementation. */
beforeAll(() => {
  class NoopIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds: number[] = [];
  }
  vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver);
});

const forms = [
  {
    label: "SSO Requirement",
    Component: SSORequirementsFormSection,
    endpoint: "sso-requirement",
    submitName: /submit sso requirements/i,
    step1Value: "Acme Health",
    /** Every field step 5 validates before it will post. */
    fillStep5: async (user: ReturnType<typeof userEvent.setup>) => {
      await user.type(screen.getByPlaceholderText("Full name"), "Alex Morgan");
      await user.type(screen.getByPlaceholderText("name@company.com"), "alex@acmehealth.com");
    },
    /** Step 1 has a required field that blocks navigation until filled. */
    fillStep1: async (user: ReturnType<typeof userEvent.setup>) => {
      const input = screen.getByPlaceholderText("Your organization");
      await user.type(input, "Acme Health");
    },
  },
  {
    label: "Talk to Sales",
    Component: ShareContextFormSection,
    endpoint: "talk-to-sales",
    submitName: /submit sales inquiry/i,
    step1Value: "Evaluating platform features",
    fillStep5: async (user: ReturnType<typeof userEvent.setup>) => {
      await user.type(screen.getByPlaceholderText("Your full name"), "Alex Morgan");
      await user.type(screen.getByPlaceholderText("name@company.com"), "alex@acmehealth.com");
      await user.type(screen.getByPlaceholderText("Organization or company name"), "Acme Health");
    },
    /** Step 1 requires a primary reason before navigation is allowed. */
    fillStep1: async (user: ReturnType<typeof userEvent.setup>) => {
      await user.selectOptions(
        screen.getByRole("combobox"),
        "Evaluating platform features",
      );
    },
  },
];

describe.each(forms)("$label form — step navigation never submits", (form) => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  /** Walk from step 1 to step 5 using only the Continue button. */
  async function advanceToStep5(user: ReturnType<typeof userEvent.setup>) {
    await form.fillStep1(user);
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole("button", { name: /continue/i }));
    }
  }

  it("does not submit when advancing step 4 -> step 5", async () => {
    const user = userEvent.setup();
    render(<form.Component />);

    await advanceToStep5(user);

    // Step 5 is showing...
    expect(screen.getByRole("button", { name: form.submitName })).toBeInTheDocument();
    // ...and nothing was posted.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not submit on step 5 -> back to 4 -> forward to 5, and keeps the data", async () => {
    const user = userEvent.setup();
    render(<form.Component />);

    await advanceToStep5(user);
    await user.click(screen.getByRole("button", { name: /back/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByRole("button", { name: form.submitName })).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();

    // Step 1's answer survived the round trip.
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole("button", { name: /back/i }));
    }
    expect(screen.getByDisplayValue(form.step1Value)).toBeInTheDocument();
  });

  it("gives Continue and Submit separate DOM nodes, so no live type mutation", async () => {
    const user = userEvent.setup();
    render(<form.Component />);

    await form.fillStep1(user);
    for (let i = 0; i < 3; i++) {
      await user.click(screen.getByRole("button", { name: /continue/i }));
    }
    // On step 4: capture the node, advance, and compare identities.
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await user.click(continueBtn);
    const submitBtn = screen.getByRole("button", { name: form.submitName });

    expect(submitBtn).not.toBe(continueBtn);
    expect(continueBtn).not.toHaveAttribute("type", "submit");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits only once, and only when the final Submit button is clicked", async () => {
    const user = userEvent.setup();
    render(<form.Component />);

    await advanceToStep5(user);
    expect(fetchMock).not.toHaveBeenCalled();

    await form.fillStep5(user);

    await user.click(screen.getByRole("button", { name: form.submitName }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain(form.endpoint);
  });
});
