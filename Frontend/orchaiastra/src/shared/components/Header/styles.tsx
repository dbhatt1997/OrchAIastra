import { makeStyles } from "../../../utils/styles";

const useStyles = makeStyles(
  () => ({
    rootContainer: {
      height: 96,
      backgroundColor: "#1a1a1a",
      justifyContent: "space-between",
      display: "flex",
      alignItems: "center",
      padding: "0 40px",
      boxShadow: "0 4px 6px -2px rgba(220, 20, 60, 0.4)",
    },
  }),
  {
    classNamePrefix: "Header",
  }
);

export default useStyles;
