import type { Picture as TPicture } from "imagetools-core";
export type { TPicture };

export default function Picture(props: {
  src: TPicture;
  alt: string;
  class?: string;
  style?: string;
}) {
  return (
    <picture class={`inline-block ${props.class}`} style={props.style}>
      {Object.entries(props.src.sources).map(([format, images]) => (
        <source srcset={images} type={`image/${format}`} />
      ))}
      <img
        src={props.src.img.src}
        alt={props.alt}
        width={props.src.img.w}
        height={props.src.img.h}
      />
    </picture>
  );
}
