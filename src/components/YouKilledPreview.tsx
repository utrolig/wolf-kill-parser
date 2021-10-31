import React, { CSSProperties, useEffect, useRef } from "react";
import { ConsoleSettings } from "../hooks/useConsoleSettings";
import { TextPart } from "../util/parseConsole";
import html2canvas from "html2canvas";
import { DownloadedImage } from "../util/types";

export type YouKilledPreviewProps = {
  activeComponent: "youKilled" | "kills";
  consoleSettings: ConsoleSettings;
  idx: number;
  imagePrefix: string;
  isVisible: boolean;
  textShadowValue: string;
  lines: TextPart[][];
  shouldSave: boolean;
  onImageSaved: (image: DownloadedImage) => void;
};

const getShouldSaveStyles = (
  shouldSave: boolean
): CSSProperties | undefined => {
  if (shouldSave) {
    return {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  }

  return undefined;
};

export const YouKilledPreview: React.FC<YouKilledPreviewProps> = ({
  consoleSettings,
  idx,
  imagePrefix,
  textShadowValue,
  lines,
  isVisible,
  onImageSaved,
  shouldSave,
}) => {
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldSave || !linesRef.current) return;

    const save = async () => {
      const canvas = await html2canvas(linesRef.current!, {
        backgroundColor: null,
        windowWidth: 1920,
        windowHeight: 1080,
        height: 1080,
        width: 1920,
      });
      const file = await canvasToBlob(canvas);
      const name = `${imagePrefix}-${idx + 1}.png`;
      onImageSaved({ file, name });
    };

    save();
  }, [shouldSave]);

  return (
    <div
      ref={linesRef}
      style={{
        boxSizing: "border-box",
        height: "100%",
        flexDirection: "column",
        padding: 48,
        display: isVisible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: consoleSettings.youKilledBottomOffset,
        ...getShouldSaveStyles(shouldSave),
      }}
    >
      {lines.map((line, idx) => (
        <div
          style={{
            fontSize: consoleSettings.youKilledFontSize,
            textShadow: textShadowValue,
          }}
          key={idx}
        >
          {line.map(({ color, text }, i) => (
            <span style={{ color }} key={i}>
              {text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const callback = (blob: Blob | null) => {
      if (!blob) {
        return reject("No blob available");
      }

      return resolve(blob);
    };

    canvas.toBlob(callback, "image/png", 1);
  });
