"use server";

import fs from "node:fs/promises";
import { createLargeObject } from "./largeobject";
// import { storeLargeObject } from "./largeobject";

export const doeDing = async (formData: FormData) => {
  const file = formData.get("lefile");
  if (file instanceof File) {
    const fileName = "test.txt";
    const path = `./data/${fileName}`;
    await fs.writeFile(path, file.stream());

    // await writeHenk(path);
  }

  if (formData.get("newfile") === "on") {
    return await createLargeObject();
  }

  return 0;
};
