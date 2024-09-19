import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import ViewNestedBlock from "~/components/blocks/nested/ViewNested";
import { make } from "~/test-factories";
import { nestedBlockSchema } from "../schemas";

test("renders ViewNestedBlock", async () => {
  const item = make(nestedBlockSchema, { nestedTitle: "Some text" });
  const result = render(() => <ViewNestedBlock object={item} />);
  expect(result.getByText("Some text")).toBe;
});
