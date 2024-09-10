import { Show, lazy } from "solid-js";
import ContentObjectRoute from "~/components/content/Route";

const ContentObjectEditView = lazy(
  () => import("~/components/content/EditView"),
);
const ContentObjectEditRootView = lazy(
  () => import("~/components/content/EditRootView"),
);

export default function EditRoute() {
  return (
    <>
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
    </>
  );
}
