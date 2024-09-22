import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import Button from "~/components/input/Button";

test("renders Button", () => {
  const result = render(() => <Button name="buttonName" />);
  expect(result.getByRole("button")).toBe;
});

test("renders Button with label", () => {
  const result = render(() => <Button name="buttonName" label="Some text" />);
  expect(result.getByText("Some text")).toBe;
});
