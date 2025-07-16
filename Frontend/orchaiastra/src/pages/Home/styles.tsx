import { makeStyles } from "../../utils/styles";

export const useStyles = makeStyles(
  () => ({
    profilePopper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "16px",
    },
    listItem: {
      cursor: "pointer",
      width: "100%",
      padding: 16,
      gap: 5,
      alignItems: "center",
      fontWeight: 600,
      display: "flex",
      justifyContent: "center",
      "&:hover": {
        backgroundColor: "#E5E7EB",
      },
    },
    headerContent: {
      display: "flex",
      gap: 50,
      alignItems: "center",
    },
  }),
  {
    classNamePrefix: "Home",
  }
);
