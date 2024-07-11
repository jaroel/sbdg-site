import { textBlockFactory } from "./factories";
import type { PageBlock } from "./schemas";

export const NOTFOUND404PAGE: PageBlock = {
  type: "page",
  status: 404,
  title: "Page not found",
  blocks: [textBlockFactory("Sorry :(")],
};
