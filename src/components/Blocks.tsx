import { Field } from "@modular-forms/solid";
import { Dynamic, For } from "solid-js/web";
import type { Block } from "./blocks/schemas";
import {
  type BlockAddFormProps,
  type BlockEditFormProps,
  addComponents,
  editComponents,
  viewComponents,
} from "./content/mapping";

export function ViewBlocks(props: {
  blocks: Block[];
}) {
  return (
    <For each={props.blocks}>
      {(item) => (
        <Dynamic component={viewComponents[item.type]} object={item} />
      )}
    </For>
  );
}

export function AddBlock(props: BlockAddFormProps) {
  return (
    <Field of={props.form} name={`${props.path}type`}>
      {(field, fprops) => (
        <>
          {field.error && <div class="text-red-500">{field.error}</div>}
          <input
            {...fprops}
            type="hidden"
            name={field.name}
            value={field.value}
          />
          <Dynamic
            component={addComponents[field.value]}
            {...props}
            field={field}
            fprops={fprops}
          />
        </>
      )}
    </Field>
  );
}

export function EditBlock(props: BlockEditFormProps) {
  return (
    <Field of={props.form} name={`${props.path}type`}>
      {(field, fprops) => (
        <>
          {field.error && <div class="text-red-500">{field.error}</div>}
          <input
            {...fprops}
            type="hidden"
            name={field.name}
            value={field.value}
          />
          <Dynamic
            component={editComponents[field.value]}
            {...props}
            field={field}
            fprops={fprops}
          />
        </>
      )}
    </Field>
  );
}
