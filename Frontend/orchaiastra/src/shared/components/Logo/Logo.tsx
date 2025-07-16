import clsx from "clsx";

import useStyles from "./styles";

import type { FC } from "react";

type LogoProps = {
  color?: string;
  className?: string;
};
export const Logo: FC<LogoProps> = ({ color, className }) => {
  const classes = useStyles({ color });
  return (
    <div className={clsx(classes.logo, className)}>
      ORCH<span className={classes.coloredLabel}>AI</span>STRA
    </div>
  );
};
