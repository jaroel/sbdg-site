import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import Navbar from "~/components/Navbar";

test("renders Navbar", async () => {
  const { getByText } = render(() => (
    <Navbar
      pathPrefix="/"
      item={{
        content: {
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
        },
        parents: [],
        children: [],
      }}
    />
  ));

  const label = getByText("Page title");
  expect(label).toHaveTextContent("Page title");
});
