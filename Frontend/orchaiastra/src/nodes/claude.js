// inputNode.js

import { useEffect, useState, useMemo, useCallback } from "react";
import { Handle, Position } from "reactflow";

import { useStore } from "../store";
import { Tag } from "../shared/components/Tag/Tag";
import { Label } from "../shared/components/Label/Label";
import { Container } from "../shared/components/Container/Container";
import { TextBox } from "../shared/components/TextBox/Textbox";
import { claude } from "../utils/utils";
import { Dropdown } from "../shared/components/Dropdown/Dropdown";
import { makeStyles } from "../utils/styles";
import { dropdownOptions } from "../utils/utils";
import { tagsData } from "../utils/utils";

const useStyles = makeStyles(() => ({
  TagContainer: {
    display: "flex",
    gap: "10px",
  },
}));

export const Claude = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const client = useMemo(() => claude(), []);

  const currName = useMemo(
    () => data?.inputName || id.replace("customInput-", ""),
    [data, id]
  );
  const inputType = useMemo(() => data.inputType || "Text", [data]);

  const dropDownOptions = useMemo(() => dropdownOptions(), []);

  const [output, setOutput] = useState("");
  const [activeTag, setActiveTag] = useState("Process");

  const classes = useStyles();

  //   const updateOutputToNode = useCallback(() => {
  //     updateNodeField(id, "output", output);
  //   }, [updateNodeField, id, output]);

  //   const handleTypeChange = (e) => {
  //     setInputType(e.target.value);
  //     updateNodeField(id, "inputType", e.target.value);
  //   };

  const setInputName = useCallback(
    (output) => {
      edges.forEach((edge) => {
        if (edge.source === id) {
          const targetNode = nodes.find((node) => node.id === edge.target);
          if (targetNode) {
            const searchInput =
              activeTag === "Process" || activeTag === "Select"
                ? output
                : `${tagsData[activeTag]}\n${output}`;
            updateNodeField(targetNode.id, "inputName", searchInput);
          }
        }
      });
    },
    [id, nodes, edges, activeTag, updateNodeField]
  );

  const getClaudeResponse = useCallback(
    async (input) => {
      try {
        const response = await client.messages.create({
          model: "claude-opus-4-20250514",
          max_tokens: 1024,
          stream: true,
          messages: [{ role: "user", content: input }],
        });
        for await (const chunk of response) {
          const text = chunk.delta?.text || "";
          setOutput((prev) => prev + text);
        }
        setOutput((prev) => {
          setInputName(prev);
          return prev;
        });
      } catch (error) {
        console.error("Error fetching ChatGPT response:", error);
        return "Error fetching response";
      }
    },
    [client, setInputName]
  );

  useEffect(() => {
    if (data.inputName && data.inputName.trim() !== "") {
      setOutput("");
      const searchInput =
        activeTag === "Process" || activeTag === "Select"
          ? data.inputName
          : `${tagsData[activeTag]}\n${data.inputName}`;
      getClaudeResponse(searchInput);
    }
  }, [data.inputName, inputType, activeTag]);

  console.log(nodes, edges);

  return (
    <Container>
      <Label backgroundColor="#E86A33" color={"#FFFFFF"}>
        Claude
      </Label>
      <div className={classes.TagContainer}>
        <Dropdown
          value={activeTag}
          onChange={(value) => setActiveTag(value)}
          options={dropDownOptions}
        />
        <Tag
          onCancel={() => setActiveTag("Select")}
          tagTitle={activeTag === "Select" ? "Process" : activeTag}
        />
      </div>
      {/* <Input
        value={currName}
        onChange={handleNameChange}
        placeholder="Search"
        style={style}
        disableDefaultStyle={disableDefaultStyle}
      /> */}
      <TextBox height={300} data={output} />
      <>
        <Handle type="target" position={Position.Left} id={currName} />
        <Handle type="source" position={Position.Right} id={currName} />
      </>
    </Container>
  );
};
