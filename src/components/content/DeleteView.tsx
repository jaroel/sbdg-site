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
  fetchDescendants,
} from "~/server";
import { DeleteContentObject } from "../blocks/Object";
import Button from "../input/Button";

const deleteContentObjectAction = action(
  deleteContentObject,
  "deleteContentObjectAction",
);

const loadDescendants = cache(fetchDescendants, "loadDescendants");

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
  const [descendants] = createResource(contentId, loadDescendants);

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
              <div class="ml-2">
                The following content objects will be deleted after
                confirmation:
                <ol class="list-decimal list-inside ml-2">
                  <li>
                    <ul class="inline-flex flex-col">
                      <li>{props.item().object.title}</li>
                      <li class="text-slate-300">{props.item().path}</li>
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
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="default"
              onClick={() => setRoutePrefix("default")}
            >
              Confirm and delete
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
