import ContentObjectAddView from "~/components/content/AddView";
import ContentObjectRoute from "~/components/content/Route";
import { contentLoadRouteDefinition } from "~/components/content/Route";

export const route = contentLoadRouteDefinition;

export default function Route() {
  return <ContentObjectRoute component={ContentObjectAddView} />;
}
