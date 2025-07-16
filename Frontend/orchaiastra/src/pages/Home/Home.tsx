import { useContext, useState, useRef, use } from "react";
import Avatar from "@mui/material/Avatar";
import { Popover } from "@mui/material";
import { Logout } from "@mui/icons-material";

import { PipelineToolbar } from "../../components/PipelineToolbar/PipeLineToolbar";
import { PipelineUI } from "../../ui";
import { Header } from "../../shared/components/Header/Header";
import { Logo } from "../../shared/components/Logo/Logo";
import { AppContext } from "../../context/AppContext";
import useClickOutside from "../../hooks/useClickOutside";
import { useStyles } from "./styles";

export const Home = () => {
  const { profileData, logout } = useContext(AppContext);
  const [openPopover, setOpenPopover] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const classes = useStyles();

  const handleClick = () => {
    setOpenPopover(true);
  };

  const handleClose = () => {
    setOpenPopover(false);
  };

  useClickOutside<HTMLDivElement>({
    ref,
    condition: openPopover,
    onClickOutside: () => {
      setOpenPopover(false);
    },
  });

  console.log("profileData", profileData);

  return (
    <div>
      <Header>
        <div className={classes.headerContent}>
          <Logo />
          <PipelineToolbar />
        </div>
        <div>
          <Avatar ref={ref} onClick={handleClick}>
            {profileData && (profileData?.username as string)[0]?.toUpperCase()}
          </Avatar>
        </div>
      </Header>
      <Popover
        open={openPopover}
        anchorEl={ref?.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className={classes.profilePopper}>
          <div className={classes.listItem} onClick={logout}>
            <Logout /> Logout
          </div>
        </div>
      </Popover>

      <PipelineUI />
    </div>
  );
};
