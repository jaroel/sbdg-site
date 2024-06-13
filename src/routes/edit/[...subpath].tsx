import { Show } from "solid-js";
import ContentObjectEditRootView from "~/components/content/EditRootView";
import ContentObjectEditView from "~/components/content/EditView";
import ContentObjectRoute from "~/components/content/Route";
import { contentLoadRouteDefinition } from "~/components/content/Route";

export const route = contentLoadRouteDefinition;

export default function Route() {
  return (
    <ContentObjectRoute
      component={(item) => (
        <Show
          when={item().object.parentId}
          fallback={<ContentObjectEditRootView item={item} />}
        >
          <ContentObjectEditView item={item} />
        </Show>
      )}
    />
  );
}
