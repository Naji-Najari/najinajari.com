import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import { imageSize } from "image-size";

interface MdxImageProps {
  src?: string;
  alt?: string;
}

export async function MdxImage({ src, alt }: MdxImageProps) {
  if (!src) return null;

  if (src.startsWith("/")) {
    try {
      const fullPath = path.join(process.cwd(), "public", src);
      const buffer = await fs.readFile(fullPath);
      const { width, height } = imageSize(buffer);
      if (width && height) {
        return (
          <Image
            src={src}
            alt={alt ?? ""}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, 768px"
            className="rounded-xl my-6 mx-auto border border-border"
          />
        );
      }
    } catch {
      // fall through to plain img
    }
  }

  return (
    <img
      src={src}
      alt={alt ?? ""}
      className="rounded-xl my-6 mx-auto border border-border max-w-full h-auto"
      loading="lazy"
    />
  );
}
