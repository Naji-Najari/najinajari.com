import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { MdxImage } from "@/components/mdx-image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <MdxImage src={props.src} alt={props.alt} />,
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
