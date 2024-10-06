import { render } from "@solidjs/testing-library";
import { createStore } from "solid-js/store";
import { expect, test } from "vitest";
import { contentObjectSchema, fullContentSchema } from "~/schemas";
import { make } from "~/test-factories";
import { EditContentObject } from "./EditView";

test("renders ContentObjectEditView", () => {
  const item = {
    content: make(fullContentSchema, {
      object: { title: "Some text" },
    }),
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

  expect(getByLabelText("Page title")).toHaveValue("Some text");
});

test("renders ContentObjectEditView slug shown", () => {
  const item = {
    content: make(fullContentSchema, {
      slug: "slug_value",
    }),
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

  expect(getByLabelText("Slug")).toHaveValue("slug_value");
});

test("renders ContentObjectEditView slug hidden", () => {
  const item = {
    content: make(fullContentSchema, {
      parentPath: "/the/end/is/the/",
      slug: "slug_value",
    }),
    children: [],
    parents: [],
  };

  const data = contentObjectSchema.parse(item);
  const [value, setStore] = createStore(data);

  const { findByLabelText } = render(() => (
    <EditContentObject
      value={value}
      setStore={setStore}
      errors={{ _errors: [] }}
      hideSlugField={true}
    />
  ));

  expect(findByLabelText("Slug")).not.toBe;
});
