import { createAsync, useSubmission } from "@solidjs/router";
import { For, Show, createMemo, createSignal } from "solid-js";
import type { ContentObject } from "~/server";
import { fetchDescendants } from "~/server";
import type { Errors } from "~/types";
import { TextField } from "../input/TextField";
import ContentObjectFormView from "./FormView";
import { deleteContentObjectAction } from "./actions";

export default function ContentObjectDeleteView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(deleteContentObjectAction);
  const formErrors = createMemo<Errors | undefined>(() => {
    try {
      if (Array.isArray(formSubmission.error.cause._errors)) {
        return formSubmission.error.cause;
      }
    } catch {}
  });
  const [value, setValue] = createSignal("");
  const descendants = createAsync(() =>
    fetchDescendants(props.item.content.id),
  );

  return (
    <>
      <ContentObjectFormView
        item={props.item}
        action={deleteContentObjectAction}
        pathPrefix="/delete"
        additionalTitle="Delete confirmation"
        buttonA={{
          routePrefix: "default",
          title: "Confirm and delete",
        }}
      >
        <input type="hidden" name="id" value={props.item.content.id} />
        <TextField
          label="Confirmation"
          placeholder="delete me"
          value={value()}
          onInput={(event) => {
            setValue(event.currentTarget.value);
          }}
          error={formErrors()?.confirmation}
          name="confirmation"
          required
        />
        <div class="ml-2">
          The following content objects will be deleted after confirmation:
          <ol class="list-decimal list-inside ml-2">
            <li>
              <ul class="inline-flex flex-col">
                <li>{props.item.content.object.title}</li>
                <li class="text-slate-300">{props.item.content.path}</li>
              </ul>
            </li>
            <Show when={descendants() === undefined}>
              <li>All descendants content objects</li>
            </Show>
            <For each={descendants()}>
              {(item) => (
                <li>
                  <ul class="inline-flex flex-col">
                    <li>{item.object.title}</li>
                    <li class="text-slate-300">{item.path}</li>
                  </ul>
                </li>
              )}
            </For>
          </ol>
        </div>
      </ContentObjectFormView>
    </>
  );
}
