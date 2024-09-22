import { render } from "@solidjs/testing-library";
import { createStore } from "solid-js/store";
import { expect, test } from "vitest";
import { outputSchema } from "~/db/tables/contentObjects.table";
import { contentObjectSchema } from "~/schemas";
import { make } from "~/test-factories";
import { EditContentObject } from "./EditView";

test("renders ContentObjectEditView", () => {
  const item = {
    content: make(outputSchema, { object: { title: "Page Title" } }),
    children: [],
    parents: [],
  };

  const data = contentObjectSchema.parse(item);
  const [value, setStore] = createStore(data);

  const { getByLabelText } = render(() => (
    <EditContentObject
      value={value}
      setStore={setStore}
      errors={{ _errors: [] }}
      hideSlugField={false}
    />
  ));

  expect(getByLabelText("Page title")).toHaveValue("Page Title");
});
