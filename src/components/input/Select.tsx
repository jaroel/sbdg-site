import { Select as Kobalte } from "@kobalte/core/select";
import {
  type Accessor,
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
  readOnly?: boolean;
  ref: (element: HTMLSelectElement) => void;
  onInput: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
};

export function Select(props: SelectProps) {
  const [rootProps, selectProps] = splitProps(
    props,
    ["name", "placeholder", "options", "required", "disabled"],
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
        <Kobalte.Item
          item={props.item}
          class="flex flex-row space-x-2 p-2 cursor-pointer"
        >
          <Kobalte.ItemLabel class="w-full">
            {props.item.textValue}
          </Kobalte.ItemLabel>
          <Kobalte.ItemIndicator class="size-6">
            <CheckIcon title="This item is selected" />
          </Kobalte.ItemIndicator>
        </Kobalte.Item>
      )}
    >
      <Show when={props.label}>
        <Kobalte.Label class="block text-gray-600">{props.label}</Kobalte.Label>
      </Show>
      <Kobalte.HiddenSelect {...selectProps} />
      <Kobalte.Trigger
        class="flex flex-row divide-x space-x-2 min-w-48 max-w-fit p-2 border border-gray-200 ui-invalid:border-red-600 ui-disabled:text-gray-400"
        disabled={props.readOnly}
      >
        <Kobalte.Value<Option> class="w-full text-left">
          {(state) => state.selectedOption().label}
        </Kobalte.Value>
        <Kobalte.Icon class="size-6">
          <ChevronUpDownIcon title="Click to toggle the options" />
        </Kobalte.Icon>
      </Kobalte.Trigger>
      <Kobalte.Portal>
        <Kobalte.Content class="bg-white border">
          <Kobalte.Listbox class="flex flex-col divide-y" />
        </Kobalte.Content>
      </Kobalte.Portal>
      <Kobalte.ErrorMessage class="text-red-500">
        {props.error}
      </Kobalte.ErrorMessage>
    </Kobalte>
  );
}

export function SelectFieldValueFallback(
  props: Omit<SelectProps, "options"> & {
    options: Accessor<Option[]>;
  },
) {
  return (
    <Show
      when={props.options().length}
      fallback={
        <Select
          {...props}
          onChange={(event) => {
            console.log({ event });
          }}
          placeholder={props.value || undefined}
          options={[{ label: props.value, value: props.value }]}
          readOnly
        />
      }
    >
      <Select {...props} options={props.options()} />
    </Show>
  );
}
