import clsx from "clsx";

import { useStyles } from "./styles";

import type { FC } from "react";

export type InputProps = {
  id: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  className,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <input
      type="text"
      className={clsx(classes.input, className)}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};
