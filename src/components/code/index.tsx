import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface ICode {
  code: string;
  language: CodeLanguage;
}

export enum CodeLanguage {
  JSON = "json",
}

export const Code: React.FC<ICode> = ({ language, code }) => {
  return (
    <SyntaxHighlighter language={language} style={darcula}>
      {code}
    </SyntaxHighlighter>
  );
};
