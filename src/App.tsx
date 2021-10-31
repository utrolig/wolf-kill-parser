import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./App.module.css";
import { DropContainer } from "./components/DropContainer";
import { parseConsole, ParsedOutput } from "./util/parseConsole";
import { ConsoleSettings } from "./components/ConsoleSettings";
import { useConsoleSettings } from "./hooks/useConsoleSettings";
import { ImageDialog } from "./components/ImageDialog";
import { LinesManager } from "./components/LinesManager";

const linkId = "font";

export const App: React.FC = () => {
  const [rawLines, setRawLines] = useState<string>("");
  const [lines, setLines] = useState<ParsedOutput>({
    kills: [],
    youKilled: [],
  });
  const [dataUrl, setDataUrl] = useState("");
  const consoleSettings = useConsoleSettings();

  useEffect(() => {
    const prevLink = document.getElementById(linkId);

    const { head } = document;

    if (prevLink) {
      head.removeChild(prevLink);
    }

    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${consoleSettings.fontFamily.replace(
      " ",
      "+"
    )}&display=swap`;
    link.rel = "stylesheet";
    link.id = linkId;
    head.appendChild(link);
  }, [consoleSettings.fontFamily]);

  const fontFamily = consoleSettings.fontFamily;

  const containerStyle: CSSProperties = { fontFamily };

  const onFileDropped = (lines: string) => {
    setRawLines(lines);
    const parsedLines = parseConsole(lines, consoleSettings.maxKillFeedLines);
    setLines(parsedLines);
  };

  useEffect(() => {
    setLines(parseConsole(rawLines, consoleSettings.maxKillFeedLines));
  }, [consoleSettings.maxKillFeedLines]);

  const textShadowValue = useMemo(() => {
    const {
      textShadow: { color, blur, h, v },
    } = consoleSettings;

    if (h && v) {
      return `${h}px ${v}px ${blur}px ${color}`;
    }

    return "none";
  }, [consoleSettings.textShadow]);

  if (!lines.kills.length) {
    return (
      <DropContainer
        maxKillFeedLines={consoleSettings.maxKillFeedLines}
        onFileDropped={onFileDropped}
      >
        <div className={styles.Placeholder}>Drop your file here!</div>
      </DropContainer>
    );
  }

  return (
    <DropContainer
      maxKillFeedLines={consoleSettings.maxKillFeedLines}
      onFileDropped={onFileDropped}
    >
      <div className={styles.Wrapper} style={containerStyle}>
        <LinesManager
          consoleSettings={consoleSettings}
          lines={lines}
          textShadowValue={textShadowValue}
        />
        <ImageDialog imgSrc={dataUrl} onCloseRequested={() => setDataUrl("")} />
        <ConsoleSettings settings={consoleSettings} />
      </div>
    </DropContainer>
  );
};
