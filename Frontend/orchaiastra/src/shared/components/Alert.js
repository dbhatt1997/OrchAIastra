import React from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  alertContainer: {
    position: "fixed",
    zIndex: 1000,
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alertBox: {
    background: "#fff",
    borderRadius: 8,
    minWidth: 320,
    maxWidth: 400,
    padding: 24,
    boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const Alert = ({
  open,
  title = "Response",
  message = "",
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
}) => {
  const classes = useStyles();
  if (!open) return null;

  return (
    <div className={classes.alertContainer}>
      <div className={classes.alertBox}>
        <h3 style={{ margin: "0 0 12px 0" }}>{title}</h3>
        <div style={{ marginBottom: 24 }}>{message}</div>
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={onOk} style={{ padding: "8px 20px" }}>
            {okText}
          </button>
          <button onClick={onCancel} style={{ padding: "8px 20px" }}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
