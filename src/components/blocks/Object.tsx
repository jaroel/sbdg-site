import { Show, createSignal } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import type { ContentObjectAddFormSchema } from "~/schemas";
import type { ContentObject } from "~/server";
import type { Errors } from "~/types";
import { TextField } from "../input/TextField";
import EditPageBlock from "./page/EditPage";

export function AddContentObject(props: {
  parent: ContentObject;
  value: ContentObjectAddFormSchema["object"];
  setStore: SetStoreFunction<ContentObjectAddFormSchema["object"]>;
  errors?: Errors;
}) {
  const [slug, setSlug] = createSignal("a-new-page");

  return (
    <>
      <input type="hidden" name="parentId" value={props.parent.id} />
      <input type="hidden" name="object" value={JSON.stringify(props.value)} />
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

      <EditPageBlock {...props} errors={props.errors?.object} />
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

export function DeleteContentObject(props: {
  value: ContentObject;
  errors?: Errors;
}) {
  const [value, setValue] = createSignal("");
  return (
    <>
      <input type="hidden" name="id" value={props.value.id} />

      <TextField
        label="Confirmation"
        placeholder="delete me"
        value={value()}
        onInput={(event) => {
          setValue(event.currentTarget.value);
        }}
        error={props.errors?.confirmation}
        name="confirmation"
        required
      />
    </>
  );
}
