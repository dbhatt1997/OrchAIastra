import { makeStyles } from "../../../utils/styles";

export const useStyles = makeStyles(
  () => ({
    labelContainer: ({
      align,
      justify,
      height,
      backgroundColor,
      maxWidth,
      fontSize,
      fontWeight,
      color,
    }) => ({
      display: "flex",
      color: color || undefined,
      alignItems:
        align === "center"
          ? "center"
          : align === "top"
          ? "flex-start"
          : "flex-end",
      padding: "16px",
      justifyContent:
        justify === "center"
          ? "center"
          : justify === "left"
          ? "flex-start"
          : "flex-end",
      width: "auto",
      flexDirection: "column",
      backgroundColor: backgroundColor ? backgroundColor : "#F9FAFB",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      borderRadius: "6px",
      height: height || "auto",
      maxWidth: maxWidth || 500,
      overflow: "auto",
      fontSize: fontSize,
      fontWeight: fontWeight,
    }),
  }),
  {
    classNamePrefix: "Label",
  }
);
