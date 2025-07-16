import { DraggableNode } from "../DraggableNode/DraggableNode";
import useStyles from "./styles";

export const PipelineToolbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.pipelineContainer}>
      <DraggableNode type="customInput" label="Input" />
      <DraggableNode type="ChatGPT" label="ChatGPT" />
      <DraggableNode type="Claude" label="Claude" />
    </div>
  );
};
