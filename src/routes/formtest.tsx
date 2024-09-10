import { Button } from "@kobalte/core/button";
import { For } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import * as z from "zod";
import { DocumentIcon, RectangleStackIcon } from "~/components/Icons";

type TextBlock = z.infer<typeof textBlockSchema>;
const textBlockSchema = z.object({
  type: z.literal("text"),
  text: z.string().trim().min(1),
});

type NestedBlock = z.infer<typeof nestedBlockSchema>;
const nestedBlockSchema = z.object({
  type: z.literal("nested"),
  blocks: z.array(z.discriminatedUnion("type", [textBlockSchema])),
});

type PageBlock = z.infer<typeof pageBlockSchema>;
const pageBlockSchema = z.object({
  type: z.literal("page"),
  title: z.string().trim().min(1),
  description: z.optional(z.string()),
  blocks: z.array(
    z.discriminatedUnion("type", [textBlockSchema, nestedBlockSchema]),
  ),
});

type FormBlockData = z.infer<typeof formBlockSchema>;
const formBlockSchema = z.object({
  type: z.literal("form"),
  formTitle: z.string().trim().min(1),
  object: z.discriminatedUnion("type", [pageBlockSchema, textBlockSchema]),
});

function TextBlockEdit(props: {
  value: TextBlock;
  setStore: SetStoreFunction<TextBlock>;
}) {
  return (
    <div class="border m-2">
      <div class="bg-slate-100">
        <textarea
          class="border w-400 h-200"
          onInput={(event) => {
            props.setStore("text", event.target.value);
          }}
        >
          {props.value.text}
        </textarea>
      </div>
    </div>
  );
}

function NestedBlockEdit(props: {
  value: NestedBlock;
  setStore: SetStoreFunction<NestedBlock>;
}) {
  function insert() {
    const newValue = {
      type: "text",
      text: "dffd",
    } as const;
    props.setStore("blocks", props.value.blocks.length, newValue);
  }

  return (
    <div class="border m-2">
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
        <For each={props.value.blocks}>
          {(value) => {
            const [store, setStore] = createStore(value);
            return <TextBlockEdit value={store} setStore={setStore} />;
          }}
        </For>
      </div>
    </div>
  );
}

function PageBlockEdit(props: {
  value: PageBlock;
  setStore: SetStoreFunction<PageBlock>;
}) {
  return (
    <div class="border m-2">
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
                const newValue = textBlockSchema.parse({
                  type: "text",
                  text: "dffd",
                });
                props.setStore("blocks", props.value.blocks.length, newValue);
              }}
            >
              <DocumentIcon title="Insert text block" />
            </Button>
            <Button
              title="Nested block"
              class="size-4 disabled:text-gray-400"
              onClick={() => {
                const newValue = nestedBlockSchema.parse({
                  type: "nested",
                  blocks: [
                    {
                      type: "text",
                      text: "dffd",
                    },
                  ],
                });
                props.setStore("blocks", props.value.blocks.length, newValue);
              }}
            >
              <RectangleStackIcon title="Insert nested" />
            </Button>
          </div>
        </div>
      </div>
      <div class="bg-slate-100">
        <For each={props.value.blocks}>
          {(value) => {
            switch (value.type) {
              case "text": {
                const [store, setStore] = createStore(value);
                return <TextBlockEdit value={store} setStore={setStore} />;
              }
              case "nested": {
                const [store, setStore] = createStore(value);
                return <NestedBlockEdit value={store} setStore={setStore} />;
              }
              default:
                assertCannotReach(value);
            }
          }}
        </For>
      </div>
    </div>
  );
}

function FormBlockEdit(props: {
  value: FormBlockData;
  setStore: SetStoreFunction<FormBlockData>;
}) {
  const [value, setStore] = createStore(props.value.object);
  return (
    <div class="border m-2">
      <div class="bg-slate-100">
        <label>{props.value.formTitle}</label>
      </div>
      <div class="bg-slate-100">
        <FormBlockEditObject value={value} setStore={setStore} />
      </div>
    </div>
  );
}

function FormBlockEditObject(props: {
  value: FormBlockData["object"];
  setStore: SetStoreFunction<FormBlockData["object"]>;
}) {
  switch (props.value.type) {
    case "text": {
      const [value, setStore] = createStore(props.value);
      return <TextBlockEdit value={value} setStore={setStore} />;
    }
    case "page": {
      const [value, setStore] = createStore(props.value);
      return <PageBlockEdit value={value} setStore={setStore} />;
    }
    default:
      assertCannotReach(props.value);
  }
}

function assertCannotReach(value: never) {
  throw new Error("Shouldn't reach");
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

const initialValues2 = formBlockSchema.parse(initialValues);

export default function App() {
  const [value, setStore] = createStore(initialValues2);
  return (
    <div class="border m-2">
      <FormBlockEdit value={value} setStore={setStore} />
    </div>
  );
}
