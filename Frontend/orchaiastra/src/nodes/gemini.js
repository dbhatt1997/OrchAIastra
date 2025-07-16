// inputNode.js

import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { Handle, Position } from "reactflow";

import { useStore } from "../store";
import { Tag } from "../shared/components/Tag/Tag";
import { Label } from "../shared/components/Label/Label";
import { Container } from "../shared/components/Container/Container";
import { TextBox } from "../shared/components/TextBox/Textbox";
import { Dropdown } from "../shared/components/Dropdown/Dropdown";
import { makeStyles } from "../utils/styles";
import { AppContext } from "../context/AppContext";
import { gemini } from "../utils/utils";

const useStyles = makeStyles(() => ({
  TagContainer: {
    display: "flex",
    gap: "10px",
  },
}));

export const Gemini = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const client = useMemo(() => gemini(), []);

  const currName = useMemo(
    () => data?.inputName || id.replace("customInput-", ""),
    [data, id]
  );
  // const inputType = useMemo(() => data.inputType || "Text", [data]);

  const { tags, tagsDropdown } = useContext(AppContext);

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

  // const setInputName = useCallback(
  //   (output) => {
  //     edges.forEach((edge) => {
  //       if (edge.source === id) {
  //         const targetNode = nodes.find((node) => node.id === edge.target);
  //         if (targetNode) {
  //           const searchInput =
  //             activeTag === "Process" || activeTag === "Select"
  //               ? output
  //               : `${tags[activeTag]}\n${output}`;
  //           updateNodeField(targetNode.id, "inputName", searchInput);
  //         }
  //       }
  //     });
  //   },
  //   [id, nodes, edges, activeTag, updateNodeField]
  // );

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
            const existingVal = targetNode.data.inputName || "";

            if (!existingVal.includes(value)) {
              const updatedVal = existingVal
                ? `${existingVal}\n${value}`
                : value;
              updateNodeField(targetNode.id, key, updatedVal);
            }
          }
        }
      }
    });
  }, []);

  const getGeminiResponse = useCallback(
    async (input) => {
      try {
        const response = await client.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: input,
        });

        setKeyValue(id, "output", false);
        for await (const chunk of response) {
          const text = chunk?.text || "";
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
          : `${tags[activeTag]}\n${data.inputName}`;
      getGeminiResponse(searchInput);
    }
  }, [data.inputName, activeTag]);

  useEffect(() => {
    updateNodeField(id, "output", { [id]: true });
  }, [id]);

  console.log(nodes, edges);

  return (
    <Container>
      <Label backgroundColor="grey" color={"#FFFFFF"}>
        Gemini
      </Label>
      <div className={classes.TagContainer}>
        <Dropdown
          value={activeTag}
          onChange={(value) => setActiveTag(value)}
          options={tagsDropdown}
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
