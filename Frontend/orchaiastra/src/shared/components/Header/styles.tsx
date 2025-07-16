import { makeStyles } from "../../../utils/styles";

const useStyles = makeStyles(
  () => ({
    rootContainer: {
      width: "100%",
      height: 96,
      backgroundColor: "#1a1a1a",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      boxShadow: "0 4px 6px -2px rgba(220, 20, 60, 0.4)",
    },
  }),
  {
    classNamePrefix: "Header",
  }
);

export default useStyles;
