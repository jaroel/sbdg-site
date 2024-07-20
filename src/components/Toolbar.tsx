import { Show, useContext } from "solid-js";
import { ContentObjectContext } from "./content/context";

export default function Toolbar() {
  const item = useContext(ContentObjectContext);
  return (
    <Show when={item?.()}>
      {(item) => (
        <div class="text-right bg-blue-100">
          <a
            class="mr-4"
            href={`/delete${item().path}`}
            title="Delete this item"
          >
            delete
          </a>
          <a
            class="mr-4"
            href={`/add${item().path}`}
            title="Add a new item here"
          >
            add
          </a>
          <a class="mr-4" href={`/edit${item().path}`} title="Edit this item">
            edit
          </a>
          <a class="mr-4" href={item().path} title="View this item">
            view
          </a>
          <a class="mr-4" href="/" title="Go to the home page">
            home
          </a>
          <a class="mr-4" href="/images" title="Manage images">
            images
          </a>
        </div>
      )}
    </Show>
  );
}
