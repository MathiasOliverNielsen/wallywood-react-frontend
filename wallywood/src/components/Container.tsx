import { type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({ as, className, children, ...rest }: ContainerProps<T>) {
  const Tag = (as || "div") as ElementType;
  const cls = ["container", className].filter(Boolean).join(" ");
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
