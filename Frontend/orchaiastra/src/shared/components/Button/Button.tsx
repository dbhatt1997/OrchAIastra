import clsx from "clsx";

import { useStyles } from "./styles";

import type { FC } from "react";

type ButtonProps = {
  title?: string;
  onClick?: () => void;
  className?: string;
};

export const Button: FC<ButtonProps> = ({ title, onClick, className }) => {
  const classes = useStyles();
  return (
    <button onClick={onClick} className={clsx(classes.button, className)}>
      {title || "Search"}
    </button>
  );
};
