import { makeStyles } from "../../utils/styles";

const useStyles = makeStyles(
  () => ({
    loginForm: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -70%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: 500,
      padding: "5px",
      backgroundColor: "#EEF2FF",
      border: "1px solid #3730A3",
      borderRadius: "8px",
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: 90,
    },
    logo: {
      fontFamily: "FranklinGothic",
      fontSize: "38px",
      fontWeight: 700,
    },
    link: {
      color: "#3730A3",
      cursor: "pointer",
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "none",
      },
    },
    register: {
      display: "flex",
      justifyContent: "center",
      margin: "10px 0px",
      whiteSpace: "pre",
    },
    loginButton: {
      fontSize: "16px",
      marginTop: 8,
    },
  }),
  {
    classNamePrefix: "Login",
  }
);

export default useStyles;
