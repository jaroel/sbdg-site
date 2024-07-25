import { Show } from "solid-js";
import ContentObjectEditRootView from "~/components/content/EditRootView";
import ContentObjectEditView from "~/components/content/EditView";
import ContentObjectRoute from "~/components/content/Route";
import { contentLoadRouteDefinition } from "~/components/content/Route";

export const route = contentLoadRouteDefinition;

export default function Route() {
  return (
    <ContentObjectRoute
      component={(props) => (
        <Show
          when={props.item.path !== "/"}
          fallback={<ContentObjectEditRootView {...props} />}
        >
          <ContentObjectEditView {...props} />
        </Show>
      )}
    />
  );
}
