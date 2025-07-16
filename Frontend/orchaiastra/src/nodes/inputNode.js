// inputNode.js

import { useEffect, useState, useCallback } from "react";
import { Handle, Position } from "reactflow";

import { useStore } from "../store";
import { Button } from "../shared/components/Button/Button";
import { Input } from "../shared/components/Input/Input";
import { Label } from "../shared/components/Label/Label";
import { Container } from "../shared/components/Container/Container";

export const InputNode = ({
  showTitle,
  id,
  data,
  disableDefaultStyle,
  disableDefaultHandlers = false,
  inputs,
  style,
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = useCallback(
    (e) => {
      setCurrName(e.target.value);
      updateNodeField(id, "inputName", e.target.value);
    },
    [id, updateNodeField]
  );

  const handleTypeChange = useCallback(
    (e) => {
      setInputType(e.target.value);
      updateNodeField(id, "inputType", e.target.value);
    },
    [id, updateNodeField]
  );

  useEffect(() => {
    updateNodeField(id, "inputName", currName);
    updateNodeField(id, "inputType", inputType);
  }, [currName, inputType, id, updateNodeField]);

  const handleSearch = useCallback(
    () =>
      edges.forEach((edge) => {
        if (edge.source === id) {
          const targetNode = nodes.find((node) => node.id === edge.target);
          if (targetNode) {
            updateNodeField(targetNode.id, "inputName", currName);
            updateNodeField(targetNode.id, "inputType", inputType);
          }
        }
      }),
    [currName, inputType, id, nodes, edges, updateNodeField]
  );

  return (
    <Container>
      <Label>Chat With AI</Label>
      <Input
        value={currName}
        onChange={handleNameChange}
        placeholder="Search"
        style={style}
        disableDefaultStyle={disableDefaultStyle}
      />
      <Button onClick={handleSearch} />
      {!disableDefaultHandlers && (
        <Handle type="source" position={Position.Right} id={currName} />
      )}
    </Container>
  );
};
