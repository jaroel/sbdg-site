import { createForm, getValue, setValues, zodForm } from "@modular-forms/solid";
import { action, useAction, useSubmission } from "@solidjs/router";
import { type Accessor, createEffect, createSignal } from "solid-js";
import type * as z from "zod";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { type ContentViews, contentObjectAddSchema } from "~/schemas";
import { type ContentObject, addContentObject } from "~/server";
import { AddContentObject } from "../blocks/Object";

const addContentObjectAction = action(
  addContentObject,
  "addContentObjectAction",
);

export default function ContentObjectAddView(props: {
  container: Accessor<ContentObject>;
}) {
  const formSubmission = useSubmission(addContentObjectAction);
  const submitForm = useAction(addContentObjectAction);

  const [form, { Form }] = createForm<z.infer<typeof contentObjectAddSchema>>({
    initialValues: {
      content: {
        parentId: props.container().content.id,
        object: {
          type: "page",
          title: "A new page",
          description: "Please describe this page",
          blocks: [
            {
              type: "text",
              text: "This is a new page",
            },
          ],
        },
      },
      slug: "new-page",
    },
    validate: zodForm(contentObjectAddSchema),
    validateOn: "change",
  });

  createEffect(() => {
    setValues(form, {
      content: {
        parentId: props.container().content.id,
      },
    });
  });

  const [routePrefix, setRoutePrefix] = createSignal<ContentViews>("edit");

  return (
    <>
      <Toolbar item={props.container} />
      <Navbar
        item={props.container}
        pathPrefix="/add"
        additionalTitle={getValue(form, "content.object.title")}
      />
      <div>
        <Form
          onSubmit={async (_, event) => {
            const formData = new FormData(event.currentTarget, event.submitter);
            formData.append("routePrefix", routePrefix());
            await submitForm(formData);
          }}
          method="post"
          action={addContentObjectAction}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: form.submitting || formSubmission.pending,
          }}
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.container} pathPrefix="/add" />
            <main class="px-2 bg-white">
              <AddContentObject form={form} path="content." />
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:text-gray-300 disabled:bg-gray-400"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="edit"
              onClick={() => setRoutePrefix("edit")}
            >
              Add and edit
            </button>
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:text-gray-300 disabled:bg-gray-400"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="default"
              onClick={() => setRoutePrefix("default")}
            >
              Add and view
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
