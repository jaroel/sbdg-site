import type { TiptapMarkType } from "../input/schema";
import type { TextBlock } from "./schemas";

export function textBlockFactory(
  value: string | string[],
  mark?: TiptapMarkType,
): TextBlock {
  const values = typeof value === "string" ? [value] : value;
  return {
    type: "text",
    text: {
      type: "doc",
      content: values.map((value) => ({
        type: "paragraph",
        content: [
          {
            type: "text",
            text: value,
            marks: mark ? [{ type: mark }] : undefined,
          },
        ],
      })),
    },
  };
}
