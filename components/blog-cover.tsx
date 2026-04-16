import Image from "next/image";
import type { PostMeta } from "@/lib/blog";

interface BlogCoverProps {
  post: PostMeta;
  aspect?: "16/9" | "2/1";
  rounded?: string;
  priority?: boolean;
  sizes?: string;
}

function FrameBackground() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-primary-sky/10 via-background to-background"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:32px_32px]"
      />
    </>
  );
}

export function BlogCover({
  post,
  aspect = "16/9",
  rounded = "rounded-xl",
  priority = false,
  sizes,
}: BlogCoverProps) {
  const aspectClass = aspect === "2/1" ? "aspect-[2/1]" : "aspect-[16/9]";

  if (post.image && post.imageWidth && post.imageHeight) {
    return (
      <div
        className={`relative ${aspectClass} overflow-hidden ${rounded} border border-border/50`}
      >
        <FrameBackground />
        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
          <Image
            src={post.image}
            alt={post.title}
            width={post.imageWidth}
            height={post.imageHeight}
            priority={priority}
            sizes={sizes ?? "(max-width: 768px) 100vw, 768px"}
            className="max-w-full max-h-full w-auto h-auto rounded-lg shadow-md ring-1 ring-border/40"
          />
        </div>
      </div>
    );
  }

  if (post.image) {
    return (
      <div
        className={`relative ${aspectClass} overflow-hidden ${rounded} border border-border/50`}
      >
        <FrameBackground />
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 100vw, 768px"}
          className="object-contain p-3"
        />
      </div>
    );
  }

  const primaryTag = post.tags[0];

  return (
    <div
      className={`relative ${aspectClass} overflow-hidden ${rounded} border border-border/50`}
    >
      <FrameBackground />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-primary-sky/30 via-transparent to-transparent"
      />
      {primaryTag && (
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-border text-foreground">
            {primaryTag}
          </span>
        </div>
      )}
    </div>
  );
}
