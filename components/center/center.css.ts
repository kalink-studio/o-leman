import { gutterSize } from "@kalink-ui/seedly";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

import { breakpoints } from "@/style/breakpoints";

export const center = style({
  inlineSize: `min(${breakpoints["3xl"]}px, ${calc("100vw").subtract(calc.multiply(gutterSize, 2)).toString()})`,
  maxInlineSize: breakpoints["3xl"],
});
