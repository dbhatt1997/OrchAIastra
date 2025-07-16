import type { FC } from "react";

import useStyles from "./styles";

type HeaderProps = {
  children?: React.ReactNode;
};
export const Header: FC<HeaderProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.rootContainer}>{children}</div>;
};
