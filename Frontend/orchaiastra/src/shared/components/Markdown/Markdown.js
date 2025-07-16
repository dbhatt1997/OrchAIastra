import { useCallback, useEffect, useState } from "react";
import { Label } from "../Label/Label";

const MarkDown = ({ children }) => {
  const [elements, setElements] = useState([]);

  const parseInline = useCallback((text) => {
    const parts = [];
    let remaining = text;

    // Order: code > bold > italic
    const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(remaining.slice(lastIndex, match.index));
      }

      const matchedText = match[0];

      if (matchedText.startsWith("`")) {
        parts.push(<code key={match.index}>{matchedText.slice(1, -1)}</code>);
      } else if (matchedText.startsWith("**")) {
        parts.push(
          <strong key={match.index}>{matchedText.slice(2, -2)}</strong>
        );
      } else if (matchedText.startsWith("*")) {
        parts.push(<em key={match.index}>{matchedText.slice(1, -1)}</em>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }, []);

  const parseMarkdown = useCallback(
    (markdown) => {
      const lines = markdown.split("\n");
      const jsx = [];
      let inCodeBlock = false;
      let codeLanguage = "";
      let codeBuffer = [];

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Code block toggler
        if (line.trim().startsWith("```")) {
          if (!inCodeBlock) {
            inCodeBlock = true;
            codeLanguage = line.trim().slice(3) || "text";
            codeBuffer = [];
          } else {
            inCodeBlock = false;
            jsx.push(
              <Label
                justify="left"
                align="top"
                backgroundColor="#E5E5E5"
                key={`code-block-${i}`}
                maxWidth={468}
              >
                <span>{codeLanguage}</span>
                <pre key={`code-${i}`}>
                  <code className={`language-${codeLanguage}`}>
                    {codeBuffer.join("\n")}
                  </code>
                </pre>
              </Label>
            );
          }
          continue;
        }

        if (inCodeBlock) {
          codeBuffer.push(line);
          continue;
        }

        // Headings
        if (/^#{1,6} /.test(line)) {
          const level = line.match(/^#+/)[0].length;
          const content = line.replace(/^#{1,6} /, "");
          const Tag = `h${level}`;
          jsx.push(<Tag key={i}>{parseInline(content)}</Tag>);
        }

        // Unordered list
        else if (/^- /.test(line)) {
          const items = [];
          while (i < lines.length && /^- /.test(lines[i])) {
            items.push(<li key={i}>{parseInline(lines[i].slice(2))}</li>);
            i++;
          }
          i--; // backtrack 1 line since for loop will increment
          jsx.push(<ul key={`ul-${i}`}>{items}</ul>);
        }

        // Empty line
        else if (line.trim() === "") {
          jsx.push(<br key={`br-${i}`} />);
        }

        // Paragraph
        else {
          jsx.push(<p key={i}>{parseInline(line)}</p>);
        }
      }

      return jsx;
    },
    [parseInline]
  );

  useEffect(() => {
    if (children) {
      const parsed = parseMarkdown(children);
      setElements(parsed);
    }
  }, [children, parseMarkdown]);

  return <div>{elements.map((el) => el)}</div>;
};

export default MarkDown;
