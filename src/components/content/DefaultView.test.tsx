import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import ContentObjectDefaultView from "~/components/content/DefaultView";
import { contentObjectFactory } from "~/factories";

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
  const content = contentObjectFactory
    .set({
      object: { type: "page", title: "Page title", blocks: [] },
    })
    .build();

  const item = {
    ...contentObjectFactory.schema.parse(content),
    children: [],
    parents: [],
  };

  const result = render(() => <ContentObjectDefaultView item={item} />);
  const heading = result.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page title");
});
