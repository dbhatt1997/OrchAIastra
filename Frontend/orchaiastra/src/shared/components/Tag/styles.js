import { makeStyles } from "../../../utils/styles";

export const useStyles = makeStyles(
  () => ({
    tagContainer: {
      padding: "3px 4px 3px 8px",
      backgroundColor: "#ECFDF5",
      fontSize: "12px",
      border: "1px solid #10B981",
      width: "fit-content",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "2px",
    },
    closingIcon: {
      cursor: "pointer",
      marginLeft: "4px",
    },
  }),
  {
    classNamePrefix: "Tag",
  }
);
