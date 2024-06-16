import ContentObjectDeleteView from "~/components/content/DeleteView";
import ContentObjectRoute from "~/components/content/Route";
import { contentLoadRouteDefinition } from "~/components/content/Route";

export const route = contentLoadRouteDefinition;

export default function Route() {
  return (
    <ContentObjectRoute
      component={(item) => <ContentObjectDeleteView item={item} />}
    />
  );
}
