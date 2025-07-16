import { makeStyles } from "../../utils/styles";

const useStyles = makeStyles(
  () => ({
    container: {
      cursor: "grab",
      minWidth: "80px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      borderRadius: "8px",
      backgroundColor: "#eae5e3",
      justifyContent: "center",
      flexDirection: "column",
      "&:active": {
        transform: "scale(1.03)",
      },
    },
  }),
  {
    classNamePrefix: "DraggableNode",
  }
);

export default useStyles;
