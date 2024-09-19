import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import ContentObjectDefaultView from "~/components/content/DefaultView";
import { outputSchema } from "~/db/tables/contentObjects.table";
import { make } from "~/test-factories";

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
});

test("renders factory item", async () => {
  const item = make(outputSchema, {
    object: { title: "Page title" },
  });

  const result = render(() => (
    <ContentObjectDefaultView
      item={{
        ...item,
        children: [],
        parents: [],
      }}
    />
  ));
  const heading = result.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page title");
});
