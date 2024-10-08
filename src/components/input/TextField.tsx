import { TextField as Kobalte } from "@kobalte/core";
import { type JSX, Show, splitProps } from "solid-js";
import type { ZodFormattedError } from "zod";

type TextFieldProps = {
  name?: string;
  type?: "text" | "email" | "tel" | "password" | "url" | "date" | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  value: string | undefined;
  error?: ZodFormattedError<any>;
  multiline?: boolean | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  ref?: (element: HTMLInputElement | HTMLTextAreaElement) => void;
  onInput?: JSX.EventHandler<
    HTMLInputElement | HTMLTextAreaElement,
    InputEvent
  >;
  onChange?: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, FocusEvent>;
};

export function TextField(props: TextFieldProps) {
  const [rootProps, inputProps] = splitProps(
    props,
    ["name", "value", "required", "disabled"],
    ["placeholder", "ref", "onInput", "onChange", "onBlur"],
  );
  return (
    <Kobalte.Root
      {...rootProps}
      validationState={props.error ? "invalid" : "valid"}
    >
      <Show when={props.label}>
        <Kobalte.Label class="text-gray-600 cursor-pointer">
          {props.label}
        </Kobalte.Label>
      </Show>
      <Show
        when={props.multiline}
        fallback={
          <Kobalte.Input
            {...inputProps}
            type={props.type}
            class="w-full p-2 border border-gray-200 ui-invalid:border-red-600 ui-disabled:text-gray-400"
          />
        }
      >
        <Kobalte.TextArea
          {...inputProps}
          autoResize
          class="w-full p-2 border border-gray-200 ui-invalid:border-red-600 ui-disabled:text-gray-400"
        >
          {props.value}
        </Kobalte.TextArea>
      </Show>
      <Kobalte.ErrorMessage class="text-red-500">
        {props.error?._errors.join("\n")}
      </Kobalte.ErrorMessage>
    </Kobalte.Root>
  );
}
