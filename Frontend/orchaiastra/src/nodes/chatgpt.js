// inputNode.js

import { useEffect, useState, useMemo, useCallback } from "react";
import { Handle, Position } from "reactflow";

import { useStore } from "../store";
import { Tag } from "../shared/components/Tag/Tag";
import { Label } from "../shared/components/Label/Label";
import { Container } from "../shared/components/Container/Container";
import { TextBox } from "../shared/components/TextBox/Textbox";
import { chatgpt } from "../utils/utils";
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

export const ChatGPT = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const client = useMemo(() => chatgpt(), []);

  const currName = useMemo(
    () => data?.id || id.replace("customInput-", ""),
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

  //   const getTargetNodes = useCallback(
  //     (id) => {
  //       const targetNodes = [];
  //       edges.forEach((edge) => {
  //         if (edge.source === id) {
  //           const targetNode = nodes.find((node) => node.id === edge.target);
  //           if (targetNode) {
  //             targetNodes.push(targetNode);
  //           }
  //         }
  //       });
  //       return targetNodes;
  //     },
  //     [nodes, edges]
  //   );
  //   const setInputName = useCallback(
  //     (output) => {
  //       edges.forEach((edge) => {
  //         if (edge.source === id) {
  //           const targetNode = nodes.find((node) => node.id === edge.target);
  //           if (targetNode) {
  //             updateNodeField(targetNode.id, "inputName", output);
  //           }
  //         }
  //       });
  //     },
  //     [id, nodes, edges, activeTag, updateNodeField]
  //   );

  const setKeyValue = useCallback((id, key, value) => {
    const nodes = useStore.getState().nodes;
    const edges = useStore.getState().edges;

    edges.forEach((edge) => {
      if (edge.source === id) {
        const targetNode = nodes.find((node) => node.id === edge.target);
        if (targetNode) {
          if (key === "output") {
            updateNodeField(targetNode.id, key, {
              ...targetNode.data.output,
              [data.id]: value,
            });
          } else if (key === "inputName") {
            const inputVal = targetNode.data.inputName
              ? `${targetNode.data.inputName}\n${value}`
              : value;
            updateNodeField(targetNode.id, key, inputVal);
          } else {
            updateNodeField(targetNode.id, key, value);
          }
        }
      }
    });
  }, []);

  const getChatGPTResponse = useCallback(
    async (input) => {
      try {
        const response = await client.chat.completions.create({
          model: "gpt-4.1",
          messages: [{ role: "user", content: input }],
          stream: true,
        });
        setKeyValue(id, "output", false);
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          setOutput((prev) => prev + text);
        }
        setOutput((prev) => {
          setKeyValue(id, "inputName", prev);
          setKeyValue(id, "output", true);
          return prev;
        });
      } catch (error) {
        console.error("Error fetching ChatGPT response:", error);
        return "Error fetching response";
      }
    },
    [client, setKeyValue, id]
  );

  useEffect(() => {
    if (
      data.inputName &&
      data.inputName.trim() !== "" &&
      data.output &&
      Object.values(data.output).every((val) => val === true)
    ) {
      setOutput("");
      const searchInput =
        activeTag === "Process" || activeTag === "Select"
          ? data.inputName
          : `${tagsData[activeTag]}\n${data.inputName}`;
      getChatGPTResponse(searchInput);
    }
  }, [data.inputName, inputType, activeTag, data.output]);

  useEffect(() => {
    updateNodeField(id, "output", { [id]: true });
  }, [id]);

  console.log(nodes, edges);

  return (
    <Container>
      <Label>ChatGPT</Label>
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
