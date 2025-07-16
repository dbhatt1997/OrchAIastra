import { Label } from "../Label/Label";
import MarkDown from "../Markdown/Markdown";

export const TextBox = ({ data, height }) => {
  console.log("TextBox data:", data);
  return (
    <Label height={height} justify="left" align="top">
      <MarkDown>{data}</MarkDown>
    </Label>
  );
};
