import { Center as CenterComponent, CenterProps } from "@kalink-ui/seedly";
import { clsx } from "clsx";
import { ElementType } from "react";

import { center } from "./center.css";

export function Center<TUse extends ElementType>({
  className,
  ...props
}: CenterProps<TUse>) {
  return <CenterComponent className={clsx(center, className)} {...props} />;
}
