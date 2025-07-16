import { useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  titleStyle: {
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
  },
}));

export const Title = ({ title, showTitle }) => {
  const classes = useStyles();

  useEffect(() => {
    if (showTitle && typeof showTitle !== "boolean") {
      throw new TypeError("showTitle is expected to be Boolean");
    }
  }, [showTitle]);
  return (
    <>
      {!(showTitle === false) && (
        <div className={classes.titleStyle}>
          <span>{title}</span>
        </div>
      )}
    </>
  );
};
