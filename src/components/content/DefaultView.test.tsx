import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import ContentObjectDefaultView from "~/components/content/DefaultView";

test("renders", async () => {
  const result = render(() => (
    <ContentObjectDefaultView
      item={{
        id: -1,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        path: "/",
        object: {
          type: "page",
          title: "Page title",
          blocks: [],
        },
        parents: [],
        children: [],
      }}
    />
  ));

  const heading = result.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page title");
  // const label = getByText("Page title");
  // expect(label).toHaveTextContent("Page title");
});
