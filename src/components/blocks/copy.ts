import { createSignal } from "solid-js";
import type { Block } from "./schemas";

export const [copyBuffer, setCopyBuffer] = createSignal<Block | undefined>();
