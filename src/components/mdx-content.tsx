import { MDXRemote } from "next-mdx-remote/rsc";
import { type ComponentPropsWithoutRef } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    const text = String(props.children);
    const id = slugify(text);
    return <h2 id={id} {...props} />;
  },
  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    const text = String(props.children);
    const id = slugify(text);
    return <h3 id={id} {...props} />;
  },
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
