import { useSubmission } from "@solidjs/router";
import { createMemo, createSignal, Show } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { createStore } from "solid-js/store";
import { mergeErrors } from "~/lib";
import type { ContentObject } from "~/server";
import type { Errors } from "~/types";
import EditPageBlock from "../blocks/page/EditPage";
import { TextField } from "../input/TextField";
import ContentObjectFormView from "./FormView";
import { saveContentObjectAction } from "./actions";

export default function ContentObjectEditView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(saveContentObjectAction);
  const formErrors = createMemo<Errors | undefined>(() => {
    try {
      if (Array.isArray(formSubmission.error.cause._errors)) {
        return formSubmission.error.cause;
      }
    } catch {}
  });
  const [value, setStore] = createStore(props.item);
  const errors = createMemo<Errors>(() =>
    mergeErrors(props.item.errors, formErrors()),
  );

  return (
    <>
      <ContentObjectFormView
        item={props.item}
        action={saveContentObjectAction}
        pathPrefix="/edit"
        titleOverride={props.item.object.title}
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
          value={value}
          setStore={setStore}
          errors={errors()}
          hideSlugField={false}
        />
      </ContentObjectFormView>
    </>
  );
}

export function EditContentObject(props: {
  value: ContentObject;
  setStore: SetStoreFunction<ContentObject>;
  hideSlugField: boolean;
  errors: Errors;
}) {
  const [value, setStore] = createStore(props.value.object);
  const [slug, setSlug] = createSignal(
    props.value.path.slice(props.value.path.lastIndexOf("/") + 1),
  );
  return (
    <div>
      <Show
        when={!props.hideSlugField}
        fallback={<input type="hidden" name="slug" value={slug()} />}
      >
        <div class="flex space-x-2 mx-2 my-4">
          <TextField
            label="Slug"
            value={slug()}
            onInput={(event) => {
              setSlug(event.currentTarget.value);
            }}
            name="slug"
            error={props.errors?.slug}
            required
          />
        </div>
      </Show>
      <input type="hidden" name="id" value={props.value.id} />
      <input type="hidden" name="object" value={JSON.stringify(value)} />
      <EditPageBlock
        value={value}
        setStore={setStore}
        errors={props.errors?.object}
      />
    </div>
  );
}
