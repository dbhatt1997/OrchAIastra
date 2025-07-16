import { Drawer as SidePanel } from "@mui/material";
import type { DrawerProps } from "@mui/material";

import type { FC } from "react";

type DrawerProp = DrawerProps & {
  children?: React.ReactNode;
};

export const Drawer: FC<DrawerProp> = ({ children, ...rest }) => {
  return <SidePanel {...rest}>{children}</SidePanel>;
};
