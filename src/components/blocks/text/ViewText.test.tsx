import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import ViewTextBlock from "~/components/blocks/text/ViewText";
import { textBlockFactory } from "../factories";

test("renders ViewTextBlock", async () => {
  const result = render(() => (
    <ViewTextBlock value={textBlockFactory("Some text")} />
  ));
  expect(result.getByText("Some text")).toBe;
});

test("renders mark Bold", async () => {
  const result = render(() => (
    <ViewTextBlock value={textBlockFactory("Some text", { type: "bold" })} />
  ));
  expect(result.getByText("Some text", { selector: "strong" })).toBe;
});

test("renders mark Italic", async () => {
  const result = render(() => (
    <ViewTextBlock value={textBlockFactory("Some text", { type: "italic" })} />
  ));
  expect(result.getByText("Some text", { selector: "em" })).toBe;
});

test("renders mark Link target _self", async () => {
  const result = render(() => (
    <ViewTextBlock
      value={textBlockFactory("Some text", {
        type: "link",
        attrs: {
          href: "/some-path",
          rel: "rel",
          target: "_self",
        },
      })}
    />
  ));

  const link = result.getByText("Some text", { selector: "a" });
  expect(link).toHaveAttribute("href", "/some-path");
  expect(link).toHaveAttribute("rel", "rel");
  // https://docs.solidjs.com/solid-router/reference/components/a#soft-navigation
  expect(link).not.toHaveAttribute("target");
});

test("renders mark Link target _blank", async () => {
  const result = render(() => (
    <ViewTextBlock
      value={textBlockFactory("Some text", {
        type: "link",
        attrs: {
          href: "/some-path",
          rel: "rel",
          target: "_blank",
        },
      })}
    />
  ));

  const link = result.getByText("Some text", { selector: "a" });
  expect(link).toHaveAttribute("href", "/some-path");
  expect(link).toHaveAttribute("rel", "rel");
  expect(link).toHaveAttribute("target", "_blank");
});

test("renders mark Link no target", async () => {
  const result = render(() => (
    <ViewTextBlock
      value={textBlockFactory("Some text", {
        type: "link",
        attrs: {
          href: "/some-path",
          rel: "rel",
          // target: [...],
        },
      })}
    />
  ));

  const link = result.getByText("Some text", { selector: "a" });
  expect(link).toHaveAttribute("href", "/some-path");
  expect(link).toHaveAttribute("rel", "rel");
  expect(link).not.toHaveAttribute("target");
});

test("renders mark Link last", async () => {
  // We want <strong> and/or <em> to wrap <a>Some text</a>
  const result = render(() => (
    <ViewTextBlock
      value={textBlockFactory("Some text", [
        { type: "italic" },
        {
          type: "link",
          attrs: {
            href: "/some-path",
            rel: "rel",
            target: "_blank",
          },
        },
      ])}
    />
  ));
  expect(result.getByText("Some text", { selector: "a" })).toBe;
  expect(result.queryByText("Some text", { selector: "em" })).not.toBe;
});
