import { X } from "lucide-react";

import { useStyles } from "./styles";

export const Tag = ({ tagTitle, onCancel }) => {
  const classes = useStyles();
  return (
    <span className={classes.tagContainer}>
      {tagTitle}
      <X
        size={14}
        onClick={onCancel}
        className={classes.closingIcon}
        color="black"
      />
      <span></span>
    </span>
  );
};
