import { type DialogRootProps, Dialog as Kobalte } from "@kobalte/core/dialog";
import "./Dialog.css";
import { XMarkIcon } from "./Icons";

export default function Dialog(props: DialogRootProps & { title: string }) {
  return (
    <Kobalte {...props} modal>
      <Kobalte.Trigger class="dialog__trigger">Open</Kobalte.Trigger>
      <Kobalte.Portal>
        <Kobalte.Overlay class="dialog__overlay" />
        <div class="dialog__positioner">
          <Kobalte.Content class="dialog__content">
            <div class="dialog__header">
              <Kobalte.Title class="dialog__title">{props.title}</Kobalte.Title>
              <Kobalte.CloseButton class="dialog__close-button">
                <XMarkIcon title="Close" />
              </Kobalte.CloseButton>
            </div>
            <Kobalte.Description class="dialog__description">
              {props.children}
            </Kobalte.Description>
          </Kobalte.Content>
        </div>
      </Kobalte.Portal>
    </Kobalte>
  );
}
