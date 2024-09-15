import { test, expect, assert } from "vitest";
import { render } from "@solidjs/testing-library";
import ViewImageBlock from "./ViewImage";

test("renders without image", async () => {
  const { getByText, queryByAltText } = render(() => (
    <ViewImageBlock object={{ type: "image", label: "Label", fileId: "" }} />
  ));

  const label = getByText("Label");
  expect(label).toHaveTextContent("Label");

  const image = queryByAltText("Demo!");
  expect(image).toBeFalsy();
});

test("renders with image", async () => {
  const { getByText, queryByAltText } = render(() => (
    <ViewImageBlock
      object={{ type: "image", label: "Label", fileId: "something" }}
    />
  ));

  const label = getByText("Label");
  expect(label).toHaveTextContent("Label");

  const image = queryByAltText("Demo!");
  expect(image).toHaveAttribute("src", "/++file++/something");
});
