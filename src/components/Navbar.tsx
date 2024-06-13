import { type Accessor, For } from "solid-js";
import type { ContentObject } from "~/server";

export default function Navbar(props: {
  item: Accessor<ContentObject>;
  pathPrefix: string;
  titleOverride?: string;
  additionalTitle?: string;
}) {
  return (
    <>
      <div class="px-4 flex space-x-1">
        <span>U bent hier:</span>
        <ul class="inline-flex items-center space-x-1">
          <For each={props.item().parents.reverse()}>
            {(item) => (
              <>
                <li>
                  <a href={props.pathPrefix + item.path}>{item.block.title}</a>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </>
            )}
          </For>
          <li>{props.titleOverride ?? props.item().object.block.title}</li>
          {props.additionalTitle && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
              <li>{props.additionalTitle}</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
