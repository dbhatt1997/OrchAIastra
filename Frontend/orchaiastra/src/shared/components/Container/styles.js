import { makeStyles } from "../../../utils/styles";

export const useStyles = makeStyles(
  () => ({
    rootContainer: ({ minWidth }) => ({
      display: "flex",
      flexDirection: "column",
      minWidth: minWidth || "300px",
      padding: "8px",
      gap: "10px",
      backgroundColor: "#EEF2FF",
      border: "1px solid #4F46E5",
      borderRadius: "6px",
      outline: "aliceblue",
      "&:hover": {
        border: "1px solid #3730A3",
        backgroundColor: "#F3F4F6",
      },
      "&:focus-within": {
        border: "1px solid #3730A3",
        backgroundColor: "#F3F4F6",
      },
    }),
  }),
  {
    classNamePrefix: "Container",
  }
);
