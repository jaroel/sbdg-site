import {
  Field,
  FieldArray,
  Form,
  type createForm,
  createFormStore,
  getErrors,
  getValues,
  zodForm,
} from "@modular-forms/solid";
import { type Component, For } from "solid-js";
import { Dynamic } from "solid-js/web";
import * as z from "zod";
import { TextField } from "~/components/input/TextField";

const textBlockSchema = z.object({
  type: z.literal("text"),
  text: z.string().trim().min(1),
});

const level1BlockSchema = z.object({
  type: z.literal("level1"),
  entries: z.array(z.discriminatedUnion("type", [textBlockSchema])),
});

const pageBlockSchema = z.object({
  type: z.literal("page"),
  title: z.string().trim().min(1),
  description: z.optional(z.string()),
  blocks: z.array(
    z.discriminatedUnion("type", [textBlockSchema, level1BlockSchema]),
  ),
});

const contentObjectBlockSchema = z.discriminatedUnion("type", [
  pageBlockSchema,
  textBlockSchema,
]);

const blockSchemas = z.discriminatedUnion("type", [
  pageBlockSchema,
  textBlockSchema,
  level1BlockSchema,
]);

const formSchema = z.object({
  formTitle: z.string().trim().min(1),
  object: contentObjectBlockSchema,
});

type FormSchema = z.infer<typeof formSchema>;

type FormProps = {
  path: string;
  form: ReturnType<typeof createForm<FormSchema>>[0];
};

function EditText(props: FormProps) {
  return (
    <>
      <Field of={props.form} name={`${props.path}text`}>
        {(field, props) => (
          <div class="bg-slate-100">
            <TextField
              {...props}
              label={`Field ${field.name}`}
              value={field.value}
              error={field.error}
            />
          </div>
        )}
      </Field>
    </>
  );
}

function EditLevel1(props: FormProps) {
  return (
    <>
      <FieldArray of={props.form} name={`${props.path}entries`}>
        {(fieldArray) => (
          <div class="border border-y-emerald-500 pl-4">
            <label>Field name: {fieldArray.name}</label>
            {fieldArray.error && (
              <div class="text-red-500">{fieldArray.error}</div>
            )}
            <For each={fieldArray.items}>
              {(_, index) => (
                <EditBlock
                  form={props.form}
                  path={`${fieldArray.name}.${index()}.`}
                />
              )}
            </For>
          </div>
        )}
      </FieldArray>
    </>
  );
}

function EditPage(props: FormProps) {
  return (
    <>
      <Field of={props.form} name={`${props.path}title`}>
        {(field, props) => (
          <div class="bg-slate-100">
            <TextField
              {...props}
              label={`Field ${field.name}`}
              value={field.value}
              error={field.error}
            />
          </div>
        )}
      </Field>

      <Field of={props.form} name={`${props.path}description`}>
        {(field, props) => (
          <div class="bg-slate-100">
            <TextField
              {...props}
              label={`Field ${field.name}`}
              value={field.value}
              error={field.error}
            />
          </div>
        )}
      </Field>

      <FieldArray of={props.form} name={`${props.path}blocks`}>
        {(fieldArray) => (
          <div class="border border-y-emerald-500 pl-4">
            <label>Field name: {fieldArray.name}</label>
            {fieldArray.error && (
              <div class="text-red-500">{fieldArray.error}</div>
            )}

            <For each={fieldArray.items}>
              {(_, index) => (
                <EditBlock
                  form={props.form}
                  path={`${fieldArray.name}.${index()}.`}
                />
              )}
            </For>
          </div>
        )}
      </FieldArray>
    </>
  );
}

type BlockKeys = z.infer<typeof blockSchemas>["type"];

const editComponents: Record<BlockKeys, Component<FormProps>> = {
  text: EditText,
  level1: EditLevel1,
  page: EditPage,
};

function EditBlock(props: FormProps) {
  return (
    <Field of={props.form} name={`${props.path}type`}>
      {(field, fprops) => (
        <>
          <div class="bg-slate-100">
            <TextField
              {...fprops}
              label={`EditBlock ${field.name}`}
              value={field.value}
              error={field.error}
              disabled
            />
          </div>
          <Dynamic
            component={editComponents[field.value]}
            {...props}
            field={field}
            fprops={fprops}
          />
        </>
      )}
    </Field>
  );
}

function EditForm(props: FormProps) {
  return (
    <Form
      of={props.form}
      method="post"
      onSubmit={(values, event) => {
        console.log({ values, event });
      }}
      class="ml-4"
    >
      <button type="submit" class="p-1 border border-blue-500 bg-blue-200">
        Le Button
      </button>
      <pre>{JSON.stringify(props.form.response)}</pre>
      <pre>{JSON.stringify(props.form.invalid)}</pre>
      <pre>{JSON.stringify(getErrors(props.form))}</pre>
      <div class="border border-y-emerald-500 bg-emerald-500 p-1 space-x-2 space-y-2">
        <Field of={props.form} name="formTitle">
          {(field, props) => (
            <div class="bg-slate-100">
              <TextField
                {...props}
                label={`Field ${field.name}`}
                value={field.value}
                error={field.error}
              />
            </div>
          )}
        </Field>
        <EditBlock form={props.form} path={`${props.path}object.`} />
      </div>
      <div>{JSON.stringify({ formValues: getValues(props.form) })}</div>
    </Form>
  );
}

export default function App() {
  const form = createFormStore<FormSchema>({
    validate: zodForm(formSchema),
    initialValues: {
      formTitle: "Form title",
      object: {
        type: "page",
        title: "Page title",
        description: "Page description",
        blocks: [
          { type: "text", text: "some text" },
          {
            type: "level1",
            entries: [
              { type: "text", text: "entry l1.1" },
              { type: "text", text: "entry l1.2" },
            ],
          },
        ],
      },
    },
  });

  return <EditForm form={form} path="" />;
}
