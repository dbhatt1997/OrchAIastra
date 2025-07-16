import { makeStyles } from "../../utils/styles";

export const useStyles = makeStyles(
  () => ({
    TextBoxContainer: () => ({
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: "8px",
      backgroundColor: "#F9FAFB",
    }),
  }),
  {
    classNamePrefix: "TextBox",
  }
);
