import React, { useEffect, useMemo, useRef } from "react";
import { ConsoleSettings } from "../hooks/useConsoleSettings";
import { TextPart } from "../util/parseConsole";
import html2canvas from "html2canvas";
import { DownloadedImage } from "../util/types";

export type KillFeedPreviewProps = {
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

export const KillFeedPreview: React.FC<KillFeedPreviewProps> = ({
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
        height: 1080,
        width: 1920,
      });
      const file = await canvasToBlob(canvas);
      const name = `${imagePrefix}-${idx + 1}.png`;
      onImageSaved({ file, name });
    };

    save();
  }, [shouldSave]);

  const linesWithDirection = useMemo(() => {
    if (consoleSettings.consoleScrollDownwards) {
      return lines;
    }

    return [...lines].reverse();
  }, [consoleSettings.consoleScrollDownwards, lines]);

  return (
    <div
      ref={linesRef}
      style={{
        flex: 1,
        flexDirection: "column",
        paddingTop: consoleSettings.killFeedTopOffset,
        paddingLeft: consoleSettings.killFeedLeftOffset,
        display: isVisible ? "flex" : "none",
      }}
    >
      {linesWithDirection.map((line, idx) => (
        <div
          style={{
            fontSize: consoleSettings.killsFontSize,
            marginBottom: consoleSettings.lineSpacing,
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
