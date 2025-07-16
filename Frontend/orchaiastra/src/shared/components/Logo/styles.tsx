import { makeStyles } from "../../../utils/styles";

type LogoStylesProps = { color?: string };
const useStyles = makeStyles<LogoStylesProps>(
  () => ({
    logo: ({ color }) => ({
      fontFamily: "FranklinGothic",
      fontSize: "32px",
      color: color ? color : "whitesmoke",
      fontWeight: 700,
    }),
    coloredLabel: {
      color: "red",
    },
  }),
  {
    classNamePrefix: "Logo",
  }
);

export default useStyles;
