import React, { useState } from "react";
import { parseConsole, ParsedOutput } from "../util/parseConsole";
import styles from "./DropContainer.module.css";

export type DropContainerProps = {
  onFileDropped: (textParts: ParsedOutput) => void;
};

export const DropContainer: React.FC<DropContainerProps> = ({
  onFileDropped,
  children,
}) => {
  const [_, setIsDraggingOver] = useState(false);

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files.length) {
      const [selectedFile] = e.dataTransfer.files;
      const text = await selectedFile.text();
      const output = parseConsole(text);
      onFileDropped(output);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragEnter={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      onDragEnd={onDragLeave}
      className={styles.wrapper}
    >
      {children}
    </div>
  );
};
