import { Button as Kobalte } from "@kobalte/core/button";
import type { JSX, ParentProps } from "solid-js";

type ButtonProps = {
  name: string;
  type?: "submit" | "button";
  label?: string;
  value?: string;
  disabled?: boolean;
  class?: string;
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
};
export default function Button(props: ParentProps & ButtonProps) {
  return (
    <Kobalte
      class="rounded-md border px-3 py-2 text-sm font-semibold text-white disabled:text-gray-300 disabled:bg-gray-400"
      {...props}
      type={props.type || "button"}
      classList={{ "bg-indigo-600 shadow-sm": props.type === "submit" }}
    >
      {props.children ?? props.label}
    </Kobalte>
  );
}
