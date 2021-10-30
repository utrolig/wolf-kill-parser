import React, { useRef } from "react";
import styles from "../App.module.css";
import { ConsoleSettings } from "../hooks/useConsoleSettings";
import { TextPart } from "../util/parseConsole";

export type LinesPreviewProps = {
  activeComponent: "youKilled" | "kills";
  consoleSettings: ConsoleSettings;
  textShadowValue: string;
  lines: TextPart[][];
};

export const LinesPreview: React.FC<LinesPreviewProps> = ({
  consoleSettings,
  textShadowValue,
  lines,
}) => {
  const linesRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={linesRef} className={styles.Lines}>
      {lines.map((line, idx) => (
        <div
          style={{
            marginBottom: consoleSettings.lineSpacing,
            textShadow: textShadowValue,
            textAlign: consoleSettings.textAlign,
          }}
          key={idx}
        >
          {line.map(({ color, text }, i) => (
            <span style={{ color, fontSize: consoleSettings.fontSize }} key={i}>
              {text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
