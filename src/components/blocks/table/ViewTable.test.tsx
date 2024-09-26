import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import ViewTableBlock from "./ViewTable";

test("renders", async () => {
  const header = ["Col A", "Col B"];
  const data = [
    ["Row 1 - A", "Row 1 - B"],
    ["Row 2 - A", "Row 2 - B"],
  ];
  const result = render(() => (
    <ViewTableBlock
      object={{ type: "table", label: "Label", content: [header, ...data] }}
    />
  ));

  expect(result.getByRole("caption")).toHaveTextContent("Label");
  expect(
    result.getAllByRole("columnheader").map((el) => el.textContent),
  ).toEqual(header);
  expect(result.getAllByRole("cell").map((el) => el.textContent)).toEqual(
    data.flat(),
  );
});
