import {
  createForm,
  getErrors,
  getValue,
  reset,
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
import { type ContentViews, contentObjectEditSchema } from "~/schemas";
import { type ContentObject, saveContentObject } from "~/server";

const saveSLObjectPage = action(saveContentObject, "saveSLObjectPage");

const toFormData = (
  item: ContentObject,
): z.infer<typeof contentObjectEditSchema> => {
  return {
    ...item,
    slug: item.object.path.slice(item.object.path.lastIndexOf("/") + 1),
  };
};

export default function ContentObjectEditView(props: {
  item: Accessor<ContentObject>;
}) {
  const formSubmission = useSubmission(saveSLObjectPage);
  const submitForm = useAction(saveSLObjectPage);

  const [form, { Form, Field, FieldArray }] = createForm<
    z.infer<typeof contentObjectEditSchema>
  >({
    initialValues: toFormData(props.item()),
    validate: zodForm(contentObjectEditSchema),
    validateOn: "change",
  });

  createEffect(() => {
    reset(form, {
      initialValues: toFormData(props.item()),
    });
  });

  const [routePrefix, setRoutePrefix] = createSignal<ContentViews>("edit");

  return (
    <>
      <Toolbar item={props.item} />
      <Navbar
        item={props.item}
        pathPrefix="/edit"
        titleOverride={getValue(form, "object.block.title")}
      />
      <div>
        <Form
          onSubmit={async (_, event) => {
            const formData = new FormData(event.currentTarget, event.submitter);
            formData.append("routePrefix", routePrefix());
            await submitForm(formData);
          }}
          method="post"
          action={saveSLObjectPage}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: form.submitting || formSubmission.pending,
          }}
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/edit" />
            <main class="w-full px-2 bg-white">
              <Field name="object.id" type="number">
                {(field, props) => (
                  <input
                    {...props}
                    type="hidden"
                    name={field.name}
                    value={field.value}
                  />
                )}
              </Field>

              <Field name="object.parentId" type="number">
                {(field, props) => (
                  <input
                    {...props}
                    type="hidden"
                    name={field.name}
                    value={field.value ?? 0}
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
                  <div class="flex flex-col space-y-4">
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
              Save
            </button>
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:text-gray-300 disabled:bg-gray-400"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="default"
              onClick={() => setRoutePrefix("default")}
            >
              Save and view
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
