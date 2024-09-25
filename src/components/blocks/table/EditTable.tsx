import { createAsync } from "@solidjs/router";
import { ErrorBoundary, For, createSignal } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import type { ZodFormattedError } from "zod";
import { listObjects } from "~/largeobject";
import { TextField } from "../../input/TextField";
import type { TableBlock } from "../schemas";
import ViewTableBlock from "./ViewTable";

function toContent(str: string) {
  return str.split("\n").map((line) => line.split("\t"));
}

export default function EditTableBlock(props: {
  value: TableBlock;
  setStore: SetStoreFunction<TableBlock>;
  errors?: ZodFormattedError<TableBlock>;
}) {
  const oids = createAsync(() => listObjects(), {
    initialValue: [],
  });

  const [open, setOpen] = createSignal(false);
  return (
    <>
      {props.errors?._errors && (
        <div class="text-red-500">{props.errors?._errors.join("\n")}</div>
      )}
      <TextField
        label="Table label"
        value={props.value.label}
        onInput={(event) => {
          props.setStore("label", event.currentTarget.value);
        }}
        error={props.errors?.label}
      />

      <TextField
        label="Table content"
        value={props.value.content.map((line) => line.join("\t")).join("\n")}
        onInput={(event) => {
          const value = event.currentTarget.value
            .split("\n")
            .map((line) => line.split("\t"));
          props.setStore("content", value);
        }}
        error={props.errors?.content}
        multiline
      />

      <pre>{JSON.stringify(props.errors)}</pre>

      <div class="border border-slate-100 my-4 p-2">
        <ErrorBoundary
          fallback={() => (
            <div class="text-red-500">
              <p>This value broke the preview:</p>
              <pre>{JSON.stringify(props.value)}</pre>
            </div>
          )}
        >
          <ViewTableBlock object={props.value} />
        </ErrorBoundary>
      </div>
    </>
  );
}
