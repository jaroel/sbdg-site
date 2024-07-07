import { action } from "@solidjs/router";
import { createSignal } from "solid-js";
import { doeDing } from "~/server2";

const [oid, setOid] = createSignal(0);

const isAdmin = action(async (formData: FormData) => {
  const objid = await doeDing(formData);
  setOid(objid);
  return objid;
}, "isAdmin");

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>

      <form
        action={isAdmin}
        method="post"
        encoding="multipart/form-data"
        class="w-full"
      >
        <label>
          <input type="checkbox" name="newfile" value="on" /> New file?
        </label>
        <hr />
        <input type="file" name="lefile" />
        <hr />
        <button type="submit" name="submitbutton" value="submit me">
          submit me!
        </button>
      </form>

      <pre>{oid()}</pre>
    </main>
  );
}
