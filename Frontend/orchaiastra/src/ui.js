import { useState, useRef, useCallback, use, useContext } from "react";
import ReactFlow, { Background } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { ChatGPT } from "./nodes/chatgpt";
import { Claude } from "./nodes/claude";
import { Button } from "./shared/components/Button/Button";
import { makeStyles } from "./utils/styles";
import { Drawer } from "./shared/components/Drawer/Drawer";
import "reactflow/dist/style.css";
import { FormWrapper } from "./shared/components/Form/FormWrapper";
import { useNotification } from "./shared/components/Snackbar/Snackbar";
import { AppContext } from "./context/AppContext";

const useStyles = makeStyles(() => ({
  tagButton: {
    position: "absolute",
    paddingLeft: "30px !important",
    top: 20,
    borderRadius: "4px",
    right: 0,
    cursor: "pointer",
    clipPath: "polygon(100% 0%, 100% 49%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
    zIndex: 99999,
  },
  tagForm: {
    padding: "10px",
  },
  paper: {
    height: `calc(100vh - 96px) !important`,
    minHeight: `calc(100vh - 96px) !important`,
    width: "400px",
    borderRadius: "8px 0px 0px 8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: "96px !important",
  },
  formTitle: {
    marginTop: 20,
    fontSize: "24px",
    fontWeight: "700",
    paddingLeft: "30px",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 40px",
    borderTop: "1px solid #E5E7EB",
    gap: "10px",
  },
}));

const FORM_ID = "tagForm";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  ChatGPT: ChatGPT,
  Claude: Claude,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const [tagDrawerOpen, setTagDrawerOpen] = useState(false);

  const { showNotification } = useNotification();
  const { authToken } = useContext(AppContext);

  const classes = useStyles();

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        style={{ width: "100wv", height: `calc(100vh - 96px)` }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          {!tagDrawerOpen && (
            <Button
              title={"Create Tag"}
              className={classes.tagButton}
              onClick={() => setTagDrawerOpen(true)}
            />
          )}
          <Background color="#aaa" gap={gridSize} />
        </ReactFlow>
        <Drawer
          anchor="right"
          open={tagDrawerOpen}
          onClose={() => setTagDrawerOpen(false)}
          classes={{
            paper: classes.paper,
          }}
        >
          <div className={classes.tagForm}>
            <div className={classes.formTitle}> Create New Tag</div>
            <FormWrapper
              formId={FORM_ID}
              input={[
                {
                  id: "tag_name",
                  label: "Tag Name",
                  placeholder: "Enter tag name",
                  required: true,
                },
                {
                  id: "description",
                  label: "Tag Description",
                  placeholder: "Enter tag description",
                  required: true,
                },
              ]}
              onSubmit={async (_, values) => {
                const response = await fetch("http://localhost:8000/tags", {
                  method: "POST",
                  body: JSON.stringify(values),
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${authToken}`,
                  },
                });
                const res = await response.json();
                if (response.ok) {
                  showNotification(res?.message, "success");
                } else {
                  showNotification(res?.detail[0]?.msg ?? res?.detail, "error");
                }
              }}
            />
          </div>
          <div className={classes.actionButtons}>
            <Button
              title={"Create Tag"}
              onClick={() => {
                const form = document.getElementById(FORM_ID);
                if (form) {
                  form.requestSubmit();
                  setTagDrawerOpen(false);
                }
              }}
            />
            <Button
              title={"Cancel"}
              onClick={() => setTagDrawerOpen(false)}
              style={{ marginLeft: "10px" }}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
};
