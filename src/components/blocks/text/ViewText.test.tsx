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
    <ViewTextBlock value={textBlockFactory("Some text", "bold")} />
  ));
  expect(result.getByText("Some text", { selector: "strong" })).toBe;
});

test("renders mark Italic", async () => {
  const result = render(() => (
    <ViewTextBlock value={textBlockFactory("Some text", "italic")} />
  ));
  expect(result.getByText("Some text", { selector: "em" })).toBe;
});
