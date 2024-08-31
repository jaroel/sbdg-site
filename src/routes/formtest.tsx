import { Button } from "@kobalte/core/button";
import { For, type JSX } from "solid-js";
import { createStore } from "solid-js/store";
import * as z from "zod";
import { DocumentIcon } from "~/components/Icons";
import { textBlockFactory } from "~/components/blocks/factories";

const textBlockSchema = z.object({
  type: z.literal("text"),
  text: z.string().trim().min(1),
});

const pageBlockSchema = z.object({
  type: z.literal("page"),
  title: z.string().trim().min(1),
  description: z.optional(z.string()),
  blocks: z.array(z.discriminatedUnion("type", [textBlockSchema])),
});

const formBlockSchema = z.object({
  type: z.literal("form"),
  formTitle: z.string().trim().min(1),
  object: z.discriminatedUnion("type", [pageBlockSchema, textBlockSchema]),
});

const blockSchemas = z.discriminatedUnion("type", [
  pageBlockSchema,
  textBlockSchema,
  formBlockSchema,
]);

function TextBlockEdit(props: { value: z.infer<typeof textBlockSchema> }) {
  return (
    <>
      <div class="bg-slate-100">
        <p>{props.value.text}</p>
      </div>
    </>
  );
}

function PageBlockEdit(props: { value: z.infer<typeof pageBlockSchema> }) {
  function insert() {
    const newValue = {
      type: "text",
      text: "New text value",
    };
    setStore("object", "blocks", store.object.blocks.length, newValue);
    // if (store.object.type === "page") {
    //   console.log("Click!", { newValue });
    // }
  }

  return (
    <>
      <div class="bg-slate-100">
        <label>{props.value.title}</label>
      </div>
      <div class="bg-slate-100">
        <p>{props.value.description}</p>
      </div>
      <div>
        <header>Insert a new block</header>
        <div class="border-b border-orange-300 divide-x flex flex-row">
          <div class="px-1">
            <Button
              title="Text block"
              class="size-4 disabled:text-gray-400"
              onClick={() => {
                insert();
              }}
            >
              <DocumentIcon title="Insert text block" />
            </Button>
          </div>
        </div>
      </div>
      <div class="bg-slate-100">
        <For each={props.value.blocks}>{(value) => <Edit value={value} />}</For>
      </div>
    </>
  );
}

type FormBlockData = z.infer<typeof formBlockSchema>;
function FormBlockEdit(props: {
  value: FormBlockData;
}) {
  return (
    <>
      <div class="bg-slate-100">
        <label>{props.value.formTitle}</label>
      </div>
      <div class="bg-slate-100">
        <Edit value={props.value.object} />
      </div>
    </>
  );
}

const initialValues: FormBlockData = {
  type: "form",
  formTitle: "Form title",
  object: {
    type: "page",
    title: "Page title",
    description: "Page description",
    blocks: [{ type: "text", text: "Some text" }],
  },
};

const [store, setStore] = createStore(initialValues);

function Edit(props: { value: z.infer<typeof blockSchemas> }): JSX.Element {
  switch (props.value.type) {
    case "form":
      return <FormBlockEdit value={props.value} />;
    case "text":
      return <TextBlockEdit value={props.value} />;
    case "page":
      return <PageBlockEdit value={props.value} />;
    default:
      assertCannotReach(props.value);
  }
}

function assertCannotReach(value: never) {
  throw new Error("Shouldn't reach");
}

export default function App() {
  return <Edit value={store} />;
}
