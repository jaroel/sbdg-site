import ContentObjectEditRootView from "~/components/content/EditRootView";
import ContentObjectEditView from "~/components/content/EditView";
import ContentObjectRoute from "~/components/content/Route";

export default function EditRoute() {
  return (
    <>
      <ContentObjectRoute
        component={(props) => (
          <>
            {!props.item.content.parentId && (
              <ContentObjectEditRootView {...props} />
            )}
            {props.item.content.parentId && (
              <ContentObjectEditView {...props} />
            )}
          </>
        )}
      />
    </>
  );
}
