import { getRoles, render } from "@solidjs/testing-library";
import { assert, expect, test } from "vitest";
import ViewTableBlock from "./ViewTable";

test("renders", async () => {
  const content = `Klassering schut. no.  Voornaam
1 1234  D.J.
2 5678  N.`;

  const result = render(() => (
    <ViewTableBlock object={{ type: "table", label: "Label", content }} />
  ));

  // console.log(getRoles(result.container));

  expect(result.getByRole("caption")).toHaveTextContent("Label");
  expect(result.getAllByRole("columnheader")).toBe;
});
