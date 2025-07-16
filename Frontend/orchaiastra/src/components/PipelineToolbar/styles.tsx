import { makeStyles } from "../../utils/styles";

const useStyles = makeStyles(
  () => ({
    pipelineContainer: {
      display: "flex",
      width: "40%",
      justifyContent: "center",
      minWidth: 400,
      gap: 20,
    },
  }),
  {
    classNamePrefix: "PipeLineToolbar",
  }
);

export default useStyles;
