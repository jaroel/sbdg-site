import { For, createEffect, createSignal } from "solid-js";
import { listObjects } from "~/largeobject";

export default function Home() {
  const [oids, setOids] = createSignal<number[]>([]);
  createEffect(async () => setOids(await listObjects()));

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <pre class="border">{JSON.stringify(oids())}</pre>

      <ul>
        <For each={oids()}>
          {(oid) => (
            <li>
              <a href={`/++file++/${oid}`} target="blank">
                <img src={`/++file++/${oid}`} alt="Preview!" class="w-60" />
              </a>
            </li>
          )}
        </For>
      </ul>
    </main>
  );
}
