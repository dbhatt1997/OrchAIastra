import clsx from "clsx";

import { useStyles } from "./styles";

import type { FC } from "react";

type ContainerProps = {
  children?: React.ReactNode;
  minWidth?: string | number;
  className?: string;
};

export const Container: FC<ContainerProps> = ({
  children,
  minWidth,
  className,
}) => {
  const classes = useStyles({ minWidth });
  return (
    <div className={clsx(classes.rootContainer, className)}>{children}</div>
  );
};
