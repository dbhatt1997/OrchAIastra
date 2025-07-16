import { makeStyles } from "../../../utils/styles";

export const useStyles = makeStyles(
  () => ({
    button: () => ({
      backgroundColor: "#4F46E5",
      padding: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
      color: "#FFFFFF",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      borderRadius: "2px",
      cursor: "pointer",
      border: "none",
    }),
  }),
  {
    classNamePrefix: "Container",
  }
);
