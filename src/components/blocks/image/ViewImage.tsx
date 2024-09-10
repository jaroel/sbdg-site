import type { ImageBlock } from "../schemas";

export default function ViewImageBlock(props: {
  object: ImageBlock;
}) {
  return (
    <div class="ml-4">
      <p class="text-xl text-gray-600">{props.object.label}</p>
      {props.object.fileId && (
        <img
          src={`/++file++/${props.object.fileId}`}
          class="w-[400px]"
          alt="Demo!"
        />
      )}
    </div>
  );
}
