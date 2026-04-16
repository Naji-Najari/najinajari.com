import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        sizes="100vw"
        className="rounded-xl"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    a: ({ href, children, ...rest }) => {
      if (typeof href === "string" && href.startsWith("/")) {
        return (
          <Link href={href} {...rest}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
