import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import ContentObjectDefaultView from "~/components/content/DefaultView";
import { fullContentSchema } from "~/schemas";
import { make } from "~/test-factories";

test("renders ContentObjectDefaultView", async () => {
  const result = render(() => (
    <ContentObjectDefaultView
      item={{
        content: {
          id: -1,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          parentPath: "/some/path/",
          slug: "slug",
          path: "/some/path/slug",
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

  const heading = result.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page title");
});

test("renders factory item", async () => {
  const item = make(fullContentSchema, {
    object: { title: "Page title" },
  });

  const result = render(() => (
    <ContentObjectDefaultView
      item={{
        content: item,
        children: [],
        parents: [],
      }}
    />
  ));
  const heading = result.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page title");
});
