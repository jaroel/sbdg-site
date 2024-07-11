import type { TextBlock } from "./schemas";

export function textBlockFactory(value: string | string[]): TextBlock {
  const values = typeof value === "string" ? [value] : value;
  return {
    type: "text",
    text: {
      type: "doc",
      content: values.map((value) => ({
        type: "paragraph",
        content: [{ type: "text", text: value }],
      })),
    },
  };
}
