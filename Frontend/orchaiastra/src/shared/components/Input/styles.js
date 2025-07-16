import { makeStyles } from "../../../utils/styles";

export const useStyles = makeStyles(
  () => ({
    input: {
      padding: "8px",
      flex: 1,
      border: "1px solid #4F46E5",
      borderRadius: "2px",
      outline: "aliceblue",
    },
    labelStyle: {
      display: "flex",
      fontWeight: 500,
    },
  }),
  {
    classNamePrefix: "Input",
  }
);
