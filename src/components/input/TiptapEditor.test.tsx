import { render } from "@solidjs/testing-library";
import { createStore } from "solid-js/store";
import { expect, test } from "vitest";
import TiptapEditor from "~/components/input/TiptapEditor";
import { make } from "~/test-factories";
import { tiptapDocSchema } from "./schema";

test("renders ContentObjectEditView withouth content errors", () => {
  const data = make(tiptapDocSchema);
  const [value, setStore] = createStore(data);

  const { queryByText } = render(() => (
    <TiptapEditor value={value} setStore={setStore} />
  ));
  expect(queryByText("Required")).not.toBe;
});

test("renders ContentObjectEditView withouth content errors", () => {
  const data = make(tiptapDocSchema);
  const [value, setStore] = createStore(data);

  const { getByText } = render(() => (
    <TiptapEditor
      value={value}
      setStore={setStore}
      errors={{
        _errors: [],
        content: {
          "1": { _errors: [], content: { _errors: ["Required"] } },
          _errors: [],
        },
      }}
    />
  ));
  expect(getByText("Required")).toBe;
});
