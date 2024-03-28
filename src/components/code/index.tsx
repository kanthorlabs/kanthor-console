import React from "react";
import { useNotification } from "@refinedev/core";
import { Button } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";

export enum Language {
  Bash = "bash",
  Go = "go",
  JSON = "json",
}

export const Code: React.FC<{ language: Language; children: string }> = ({
  language,
  children,
}) => {
  const [copied, setCopied] = React.useState(false);
  const { open } = useNotification();

  React.useEffect(() => {
    if (!copied) return;

    open?.({
      type: "success",
      description: "The code has been copied",
      message: "",
    });
    setTimeout(() => setCopied(false), 3000);
  }, [copied]);

  return (
    <div style={{ position: "relative" }}>
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <Button
          style={{ position: "absolute", right: "3px", top: "3px" }}
          type="dashed"
          icon={
            copied ? (
              <CheckOutlined style={{ color: "#52c41a" }} />
            ) : (
              <CopyOutlined />
            )
          }
        ></Button>
      </CopyToClipboard>

      <SyntaxHighlighter
        language={language}
        style={darcula}
        showLineNumbers
        showInlineLineNumbers
        wrapLines
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
