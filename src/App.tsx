import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./App.module.css";
import { DropContainer } from "./components/DropContainer";
import { TextPart } from "./util/parseConsole";
import { ConsoleSettings } from "./components/ConsoleSettings";
import { useConsoleSettings } from "./hooks/useConsoleSettings";
import html2canvas from "html2canvas";
import { ImageDialog } from "./components/ImageDialog";

const linkId = "font";

export const App: React.FC = () => {
  const [lines, setLines] = useState<TextPart[][]>([]);
  const [dataUrl, setDataUrl] = useState("");
  const linesRef = useRef<HTMLDivElement>(null);
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

  const onFileDropped = (lines: TextPart[][]) => {
    setLines(lines);
  };

  const getTextShadowValue = () => {
    const {
      textShadow: { color, blur, h, v },
    } = consoleSettings;

    if (h && v) {
      return `${h}px ${v}px ${blur}px ${color}`;
    }

    return "none";
  };

  const generatePng = useCallback(async () => {
    if (!linesRef.current) return;

    const canvas = await html2canvas(linesRef.current, {
      backgroundColor: null,
    });
    const url = canvas.toDataURL("image/png");
    setDataUrl(url);
  }, []);

  if (!lines.length) {
    return (
      <DropContainer onFileDropped={onFileDropped}>
        <div className={styles.Placeholder}>Drop your file here!</div>
      </DropContainer>
    );
  }

  return (
    <DropContainer onFileDropped={onFileDropped}>
      <div className={styles.Wrapper} style={containerStyle}>
        <div ref={linesRef} className={styles.Lines}>
          {lines.map((line, idx) => (
            <div
              style={{
                marginBottom: consoleSettings.lineSpacing,
                textShadow: getTextShadowValue(),
                textAlign: consoleSettings.textAlign,
              }}
              key={idx}
            >
              {line.map(({ color, text }, i) => (
                <span
                  style={{ color, fontSize: consoleSettings.fontSize }}
                  key={i}
                >
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
        <ImageDialog imgSrc={dataUrl} onCloseRequested={() => setDataUrl("")} />
        <ConsoleSettings
          onGenerateClicked={generatePng}
          settings={consoleSettings}
        />
      </div>
    </DropContainer>
  );
};
