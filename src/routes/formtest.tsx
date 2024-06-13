import { createForm, zodForm } from "@modular-forms/solid";
import type * as z from "zod";
import { contentObjectsTableSchema } from "~/db/schemas";

type LoginForm = z.infer<typeof contentObjectsTableSchema>;

export default function App() {
  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    validate: zodForm(contentObjectsTableSchema),
  });

  return (
    <Form
      method="post"
      onSubmit={(values, event) => {
        console.log({ values, event });
      }}
    >
      <Field name="path">
        {(field, props) => (
          <>
            <input {...props} type="text" />
            {field.error && <div>{field.error}</div>}
          </>
        )}
      </Field>

      <button type="submit">Login</button>
    </Form>
  );
}
