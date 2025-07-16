// draggableNode.js

import clsx from "clsx";
import useStyles from "./styles";

export const DraggableNode = ({ type, label }) => {
  const classes = useStyles();

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={clsx(classes.container, type)}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{}}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
