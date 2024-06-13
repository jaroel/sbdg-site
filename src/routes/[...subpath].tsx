import ContentObjectDefaultView from "~/components/content/DefaultView";
import ContentObjectRoute from "~/components/content/Route";
import { contentLoadRouteDefinition } from "~/components/content/Route";

export const route = contentLoadRouteDefinition;

export default function Route() {
  return (
    <ContentObjectRoute
      component={(item) => <ContentObjectDefaultView item={item} />}
    />
  );
}
