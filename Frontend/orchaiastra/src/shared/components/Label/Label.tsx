import { useStyles } from "./styles";
import { useScrollableInReactFlow } from "../../../hooks/useScrollableInReactFlow";

import type { FC } from "react";

export type LabelProps = {
  align?: "left" | "center" | "right";
  justify?: "start" | "center" | "end";
  backgroundColor?: string;
  color?: string;
  height?: string | number;
  maxWidth?: string | number;
  children?: React.ReactNode;
  fontSize?: string | number;
  fontWeight?: string | number;
};
export const Label: FC<LabelProps> = ({
  align = "center",
  justify = "center",
  backgroundColor,
  color,
  fontSize,
  fontWeight,
  height,
  maxWidth,
  children,
}) => {
  const scrollableRef = useScrollableInReactFlow();
  const classes = useStyles({
    align,
    justify,
    height,
    backgroundColor,
    maxWidth,
    fontSize,
    fontWeight,
    color,
  });
  return (
    <div ref={scrollableRef} className={classes.labelContainer}>
      {children || "Label"}
    </div>
  );
};
