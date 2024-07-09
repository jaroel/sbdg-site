import type { PageBlock } from "./schemas";

export const NOTFOUND404CONTENTOBJECT: {
  path: "/";
  object: PageBlock;
  parents: [];
} = {
  path: "/",
  object: {
    type: "page",
    status: 404,
    title: "Page not found",
    blocks: [
      {
        type: "text",
        text: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Sorry :(" }],
            },
          ],
        },
      },
    ],
  },
  parents: [],
};
