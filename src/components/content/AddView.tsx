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
import { textBlockFactory } from "../blocks/factories";
import Button from "../input/Button";

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
      parentId: props.container().id,
      object: {
        type: "page",
        title: "A new page",
        description: "Please describe this page",
        blocks: [textBlockFactory("This is a new page")],
      },

      slug: "new-page",
    },
    validate: zodForm(contentObjectAddSchema),
    validateOn: "change",
  });

  createEffect(() => {
    setValues(form, { parentId: props.container().id });
  });

  const [routePrefix, setRoutePrefix] = createSignal<ContentViews>("edit");

  return (
    <>
      <Toolbar item={props.container} />
      <Navbar
        item={props.container}
        pathPrefix="/add"
        additionalTitle={getValue(form, "object.title")}
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
              <AddContentObject form={form} path="" />
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="edit"
              onClick={() => setRoutePrefix("edit")}
            >
              Add and edit
            </Button>
            <Button
              type="submit"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="default"
              onClick={() => setRoutePrefix("default")}
            >
              Add and view
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
