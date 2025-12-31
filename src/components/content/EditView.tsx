import { action, useSubmission } from "@solidjs/router";
import { Show, createMemo } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { createStore } from "solid-js/store";
import { mergeErrors } from "~/lib";
import { type ContentObject, saveContentObject } from "~/server";
import EditPageBlock from "../blocks/page/EditPage";
import { TextField } from "../input/TextField";
import ContentObjectFormView from "./FormView";

export const saveContentObjectAction = action(
  saveContentObject,
  "saveContentObjectAction",
);

export default function ContentObjectEditView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(saveContentObjectAction);
  const formErrors = createMemo(() => {
    try {
      if (Array.isArray(formSubmission.result?._errors)) {
        return formSubmission.result;
      }
    } catch {}
  });
  const sub_store = createMemo(() => {
    const [value, setStore] = createStore(props.item);
    return {value, setStore};
  });

  const errors = createMemo(() => mergeErrors(props.item.errors, formErrors()));

  return (
    <ContentObjectFormView
        item={props.item}
        action={saveContentObjectAction}
        pathPrefix="/edit"
        titleOverride={sub_store().value.content.object.title}
        buttonA={{
          routePrefix: "edit",
          title: "Save and edit",
        }}
        buttonB={{
          routePrefix: "default",
          title: "Save and view",
        }}
      >
        <EditContentObject
          {...sub_store()}
          errors={errors()}
          hideSlugField={false}
        />
      </ContentObjectFormView>
  );
}

export function EditContentObject(props: {
  value: ContentObject;
  setStore: SetStoreFunction<ContentObject>;
  hideSlugField: boolean;
  errors: Awaited<ReturnType<typeof saveContentObjectAction>>;
}) {
  const sub_store = createMemo(() => {
    const [value, setStore] = createStore(props.value.content.object);
    return {value, setStore};
  });
  return (
    <div>
      <Show
        when={!props.hideSlugField}
        fallback={
          <input type="hidden" name="slug" value={props.value.content.slug} />
        }
      >
        <div class="flex space-x-2 mx-2 my-4">
          <TextField
            label="Slug"
            value={props.value.content.slug}
            onInput={(event) => {
              props.setStore("content", "slug", event.currentTarget.value);
            }}
            name="slug"
            error={props.errors.slug}
            required
          />
        </div>
      </Show>
      <input type="hidden" name="id" value={props.value.content.id} />
      <input type="hidden" name="object" value={JSON.stringify(sub_store().value)} />
      <EditPageBlock
        {...sub_store()}
        errors={props.errors.object}
      />
    </div>
  );
}
