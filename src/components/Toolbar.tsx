import type { Accessor } from "solid-js";
import type { ContentObject } from "~/server";

export default function Toolbar(props: {
  item: Accessor<ContentObject>;
}) {
  return (
    <div class="text-right bg-blue-100">
      <a
        class="mr-4"
        href={`/delete${props.item().path}`}
        title="Delete this item"
      >
        delete
      </a>
      <a
        class="mr-4"
        href={`/add${props.item().path}`}
        title="Add a new item here"
      >
        add
      </a>
      <a class="mr-4" href={`/edit${props.item().path}`} title="Edit this item">
        edit
      </a>
      <a class="mr-4" href={props.item().path} title="View this item">
        view
      </a>
      <a class="mr-4" href="/" title="Go to the home page">
        home
      </a>
    </div>
  );
}
