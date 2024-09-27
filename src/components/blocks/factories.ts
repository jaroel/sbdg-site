import type { TiptapMark } from "../input/schema";
import type { TextBlock } from "./schemas";

export function textBlockFactory(
  value: string | string[],
  mark?: TiptapMark | TiptapMark[],
): TextBlock {
  const values = typeof value === "string" ? [value] : value;
  const marks = Array.isArray(mark) ? mark : mark && [mark];
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
            marks,
          },
        ],
      })),
    },
  };
}
