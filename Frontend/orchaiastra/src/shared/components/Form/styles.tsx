import { makeStyles } from "../../../utils/styles";

export type FormStylesProps = {
  disableGutters?: boolean;
};
const useStyles = makeStyles<FormStylesProps>(
  () => ({
    formContainer: ({ disableGutters }) => ({
      padding: disableGutters ? 0 : "32px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }),
    label: {
      fontFamily: "FranklinGothic",
      fontWeight: 700,
      paddingTop: "8px",
    },
    error: {
      color: "red",
      marginTop: "-2px",
      fontSize: "14px",
    },
  }),
  {
    classNamePrefix: "Form",
  }
);

export default useStyles;
