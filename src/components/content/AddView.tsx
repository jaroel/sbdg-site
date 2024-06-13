import {
  createForm,
  getErrors,
  getValue,
  setValues,
  zodForm,
} from "@modular-forms/solid";
import { action, useAction, useSubmission } from "@solidjs/router";
import { type Accessor, createEffect, createSignal } from "solid-js";
import { For } from "solid-js/web";
import type * as z from "zod";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { TextField } from "~/components/input/TextField";
import { type ContentViews, contentObjectAddSchema } from "~/schemas";
import { type ContentObject, addContentObject } from "~/server";

const addSLObjectPage = action(addContentObject, "addSLObjectPage");

export default function ContentObjectAddView(props: {
  container: Accessor<ContentObject>;
}) {
  const formSubmission = useSubmission(addSLObjectPage);
  const submitForm = useAction(addSLObjectPage);

  const [form, { Form, Field, FieldArray }] = createForm<
    z.infer<typeof contentObjectAddSchema>
  >({
    initialValues: {
      object: {
        parentId: props.container().object.id,
        block: {
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
      object: {
        parentId: props.container().object.id,
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
        additionalTitle={getValue(form, "object.block.title")}
      />
      <div>
        <Form
          onSubmit={async (_, event) => {
            const formData = new FormData(event.currentTarget, event.submitter);
            formData.append("routePrefix", routePrefix());
            await submitForm(formData);
          }}
          method="post"
          action={addSLObjectPage}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: form.submitting || formSubmission.pending,
          }}
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.container} pathPrefix="/add" />
            <main class="px-2 bg-white">
              <Field name="object.parentId" type="number">
                {(field, props) => (
                  <input
                    {...props}
                    type="hidden"
                    name={field.name}
                    value={field.value || undefined}
                  />
                )}
              </Field>
              <Field name="object.block.type">
                {(field, props) => (
                  <input
                    {...props}
                    type="hidden"
                    name={field.name}
                    value={field.value}
                  />
                )}
              </Field>

              <div class="flex space-x-2 mx-2 my-4">
                <Field name="slug">
                  {(field, props) => (
                    <TextField
                      {...props}
                      label="Slug"
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>
              </div>

              <div class="flex space-x-2 mx-2 my-4">
                <Field name="object.block.title">
                  {(field, props) => (
                    <TextField
                      {...props}
                      label="Page title"
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>
              </div>
              <div class="flex space-x-2 mx-2 my-4">
                <Field name="object.block.description">
                  {(field, props) => (
                    <TextField
                      {...props}
                      label="Page description"
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>
              </div>
              <FieldArray name="object.block.blocks">
                {(fieldArray) => (
                  <div class="flex space-y-4 flex-col">
                    <For each={fieldArray.items}>
                      {(_, index) => (
                        <div class="flex flex-row space-x-2">
                          <Field name={`object.block.blocks.${index()}.type`}>
                            {(field, props) => (
                              <input
                                {...props}
                                type="hidden"
                                name={field.name}
                                value={field.value}
                              />
                            )}
                          </Field>
                          <Field name={`object.block.blocks.${index()}.text`}>
                            {(field, props) => (
                              <TextField
                                {...props}
                                label="Text"
                                value={field.value}
                                error={field.error}
                                multiline
                                required
                              />
                            )}
                          </Field>
                        </div>
                      )}
                    </For>
                  </div>
                )}
              </FieldArray>
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
