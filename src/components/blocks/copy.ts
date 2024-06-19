import { createSignal } from "solid-js";
import type { BlockTypes } from "./schemas";

export const [copyBuffer, setCopyBuffer] = createSignal<
  BlockTypes | undefined
>();
