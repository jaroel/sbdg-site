import { createForm, reset, zodForm } from "@modular-forms/solid";
import { action, useAction, useSubmission } from "@solidjs/router";
import { type Accessor, createEffect, createSignal } from "solid-js";
import type * as z from "zod";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { type ContentViews, contentObjectDeleteSchema } from "~/schemas";
import { type ContentObject, deleteContentObject } from "~/server";
import { DeleteContentObject } from "../blocks/Object";

const deleteContentObjectAction = action(
  deleteContentObject,
  "deleteContentObjectAction",
);

export default function ContentObjectDeleteView(props: {
  item: Accessor<ContentObject>;
}) {
  const formSubmission = useSubmission(deleteContentObjectAction);
  const submitForm = useAction(deleteContentObjectAction);

  const [form, { Form }] = createForm<
    z.infer<typeof contentObjectDeleteSchema>
  >({
    initialValues: {
      content: { id: props.item().content.id },
    },
    validate: zodForm(contentObjectDeleteSchema),
    validateOn: "change",
  });

  createEffect(() => {
    reset(form, {
      initialValues: {
        content: { id: props.item().content.id },
      },
    });
  });

  const [routePrefix, setRoutePrefix] = createSignal<ContentViews>("default");

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
              <DeleteContentObject form={form} path="content." />
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
