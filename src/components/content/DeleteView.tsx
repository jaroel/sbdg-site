import { createForm, reset, zodForm } from "@modular-forms/solid";
import { action, cache, useAction, useSubmission } from "@solidjs/router";
import {
  type Accessor,
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import type * as z from "zod";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { type ContentViews, contentObjectDeleteSchema } from "~/schemas";
import {
  type ContentObject,
  deleteContentObject,
  fetchDescentants,
} from "~/server";
import { DeleteContentObject } from "../blocks/Object";

const deleteContentObjectAction = action(
  deleteContentObject,
  "deleteContentObjectAction",
);

const loadDescentants = cache(fetchDescentants, "loadDescentants");

export default function ContentObjectDeleteView(props: {
  item: Accessor<ContentObject>;
}) {
  const formSubmission = useSubmission(deleteContentObjectAction);
  const submitForm = useAction(deleteContentObjectAction);

  const [form, { Form }] = createForm<
    z.infer<typeof contentObjectDeleteSchema>
  >({
    initialValues: { id: props.item().id },
    validate: zodForm(contentObjectDeleteSchema),
    validateOn: "change",
  });

  createEffect(() => {
    reset(form, { initialValues: { id: props.item().id } });
  });

  const [routePrefix, setRoutePrefix] = createSignal<ContentViews>("default");

  const [contentId, setContentId] = createSignal<number>();
  const [descentants] = createResource(contentId, loadDescentants);

  createEffect(() => {
    setContentId(props.item().id);
  });

  return (
    <>
      <Toolbar item={props.item} />
      <Navbar
        item={props.item}
        pathPrefix="/delete"
        additionalTitle="Delete confirmation"
      />
      <div>
        <Form
          onSubmit={async (_, event) => {
            const formData = new FormData(event.currentTarget, event.submitter);
            formData.append("routePrefix", routePrefix());
            await submitForm(formData);
          }}
          method="post"
          action={deleteContentObjectAction}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: form.submitting || formSubmission.pending,
          }}
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/delete" />
            <main class="w-full px-2 bg-white">
              <DeleteContentObject form={form} path="" />
              The following content objects will be deleted after confirmation:
              <Show when={descentants()}>
                <ol class="list-decimal list-inside ml-2">
                  <li>{props.item().object.title}</li>
                  <For each={descentants()}>
                    {(item) => (
                      <li>
                        <a href={item.path}>{item.object.title}</a>
                      </li>
                    )}
                  </For>
                </ol>
              </Show>
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:text-gray-300 disabled:bg-gray-400"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="default"
              onClick={() => setRoutePrefix("default")}
            >
              Confirm and delete
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}