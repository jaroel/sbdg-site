import type { ContentObject } from "~/server";

export default function Toolbar(props: {
  item?: ContentObject;
}) {
  return (
    <div class="text-right bg-blue-100">
      {props.item &&
        (props.item?.content.object.status_code ?? 200) === 200 && (
          <>
            <a
              class="mr-4"
              href={`/delete${props.item.content.path}`}
              title="Delete this item"
            >
              delete
            </a>
            <a
              class="mr-4"
              href={`/add${props.item.content.path}`}
              title="Add a new item here"
            >
              add
            </a>
            <a
              class="mr-4"
              href={`/edit${props.item.content.path}`}
              title="Edit this item"
            >
              edit
            </a>
            <a
              class="mr-4"
              href={props.item.content.path}
              title="View this item"
            >
              view
            </a>
          </>
        )}
      <a class="mr-4" href="/" title="Go to the home page">
        home
      </a>
      <a class="mr-4" href="/images" title="Manage images">
        images
      </a>
      <a class="mr-4" href="/icons" title="View Icons">
        icons
      </a>
      <a class="mr-4" href="/internalLink" title="View Internal Link">
        internal link
      </a>
    </div>
  );
}
