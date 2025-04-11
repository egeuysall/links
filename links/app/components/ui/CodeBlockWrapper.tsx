"use client";

import React from "react";
import CodeBlock from "../CodeBlock";

interface CodeBlockWrapperProps {
  language: string;
  fileName: string;
  code: string;
}

export const CodeBlockWrapper: React.FC<CodeBlockWrapperProps> = ({
  language,
  fileName,
  code,
}) => {
  return <CodeBlock language={language} fileName={fileName} code={code} />;
};