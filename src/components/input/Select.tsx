import { Select as Kobalte } from "@kobalte/core/select";
import {
  type JSX,
  Show,
  createEffect,
  createSignal,
  splitProps,
} from "solid-js";
import { CheckIcon, ChevronUpDownIcon } from "../Icons";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  options: Option[];
  value: string | undefined;
  error: string;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  ref: (element: HTMLSelectElement) => void;
  onInput: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
  class?: string;
};

export function Select(props: SelectProps) {
  const [rootProps, selectProps] = splitProps(
    props,
    ["name", "placeholder", "options", "required", "disabled", "class"],
    ["placeholder", "ref", "onInput", "onChange", "onBlur"],
  );
  const [getValue, setValue] = createSignal<Option>();
  createEffect(() => {
    setValue(props.options.find((option) => props.value === option.value));
  });
  return (
    <Kobalte
      {...rootProps}
      multiple={false}
      value={getValue()}
      onChange={setValue}
      optionValue="value"
      optionTextValue="label"
      validationState={props.error ? "invalid" : "valid"}
      itemComponent={(props) => (
        <Kobalte.Item item={props.item} class="flex flex-row space-x-2">
          <Kobalte.ItemLabel>{props.item.textValue}</Kobalte.ItemLabel>
          <Kobalte.ItemIndicator class="size-6">
            <CheckIcon title="Checked!" />
          </Kobalte.ItemIndicator>
        </Kobalte.Item>
      )}
    >
      <Show when={props.label}>
        <Kobalte.Label class="block text-gray-600">{props.label}</Kobalte.Label>
      </Show>
      <Kobalte.HiddenSelect {...selectProps} />
      <Kobalte.Trigger class="flex flex-row divide-x space-x-2 p-2 border border-gray-200 ui-invalid:border-red-600 ui-disabled:text-gray-400">
        <Kobalte.Value<Option>>
          {(state) => state.selectedOption().label}
        </Kobalte.Value>
        <Kobalte.Icon class="size-6">
          <ChevronUpDownIcon title="Something?" />
        </Kobalte.Icon>
      </Kobalte.Trigger>
      <Kobalte.Portal>
        <Kobalte.Content class="bg-white border">
          <Kobalte.Listbox class="flex flex-col divide-y space-y-2 p-2" />
        </Kobalte.Content>
      </Kobalte.Portal>
      <Kobalte.ErrorMessage class="text-red-500">
        {props.error}
      </Kobalte.ErrorMessage>
    </Kobalte>
  );
}
