import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import ViewTextBlock from "~/components/blocks/text/ViewText";
import { textBlockFactory } from "../factories";

test("renders ViewTextBlock", async () => {
  const { getByText } = render(() => (
    <ViewTextBlock value={textBlockFactory("Some text")} />
  ));

  const label = getByText("Some text");
  expect(label).toHaveTextContent("Some text");
});

test("renders mark Bold", async () => {
  const { getByText } = render(() => (
    <ViewTextBlock value={textBlockFactory("Some text")} />
  ));

  const label = getByText("Some text");
  expect(label).toHaveTextContent("Some text");
});
