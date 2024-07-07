"use server";
import { Readable } from "node:stream";
import { createLargeObject, createLargeObjectFromStream } from "./largeobject";

function readableStreamToNodeReadable(readableStream: ReadableStream) {
  const reader = readableStream.getReader();

  return new Readable({
    async read(size) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(Buffer.from(value));
        }
      } catch (err) {
        this.destroy(err);
      }
    },
  });
}

export const doeDing = async (formData: FormData) => {
  const file = formData.get("lefile");
  if (file instanceof File) {
    const stream = file.stream();
    return await createLargeObjectFromStream(
      readableStreamToNodeReadable(stream),
    );
  }

  if (formData.get("newfile") === "on") {
    return await createLargeObject();
  }

  return 0;
};
