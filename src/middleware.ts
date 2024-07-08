import { createMiddleware } from "@solidjs/start/middleware";
import { streamLargeObject } from "./largeobject";

export default createMiddleware({
  onRequest: [
    (event) => {
      if (event.nativeEvent.path.startsWith("/++file++/id:")) {
        console.log("Streaming large object", event.nativeEvent.path);
        return streamLargeObject(event.nativeEvent);
      }
    },
  ],
});
