import { Tabs as Kobalte } from "@kobalte/core/tabs";
import { For, type JSX } from "solid-js";
import "./Tabs.css";

export default function Tabs(props: {
  label: string;
  items: { id: string; title: string; content: () => JSX.Element }[];
}) {
  return (
    <Kobalte aria-label={props.label} class="tabs">
      <Kobalte.List class="tabs__list">
        <For each={props.items}>
          {(tab) => (
            <Kobalte.Trigger class="tabs__trigger" value={tab.id}>
              {tab.title}
            </Kobalte.Trigger>
          )}
        </For>
        <Kobalte.Indicator class="tabs__indicator" />
      </Kobalte.List>
      <For each={props.items}>
        {(tab) => (
          <Kobalte.Content value={tab.id}>{tab.content()}</Kobalte.Content>
        )}
      </For>
    </Kobalte>
  );
}
