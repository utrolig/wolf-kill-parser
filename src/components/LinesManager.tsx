import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ConsoleSettings } from "../hooks/useConsoleSettings";
import { ParsedOutput } from "../util/parseConsole";
import { KillFeedPreview } from "./KillFeedPreview";
import styles from "./LinesManager.module.css";
import classNames from "classnames";
import { Button } from "@material-ui/core";
import { DownloadedImage } from "../util/types";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { YouKilledPreview } from "./YouKilledPreview";

export type LinesManagerProps = {
  consoleSettings: ConsoleSettings;
  textShadowValue: string;
  lines: ParsedOutput;
};

export const LinesManager: React.FC<LinesManagerProps> = ({
  consoleSettings,
  lines,
  textShadowValue,
}) => {
  const [shouldSave, setShouldSave] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeComponent, setActiveComponent] = useState<"youKilled" | "kills">(
    "kills"
  );
  const [files, setFiles] = useState<DownloadedImage[]>([]);
  const { youKilled, kills } = lines;

  const isBackDisabled = useMemo(() => {
    return activeComponent === "kills" && currentIdx === 0;
  }, [activeComponent, currentIdx]);

  const isForwardDisabled = useMemo(() => {
    return (
      activeComponent === "youKilled" && currentIdx === youKilled.length - 1
    );
  }, [activeComponent, currentIdx, youKilled.length]);

  const goBack = useCallback(() => {
    if (activeComponent === "youKilled" && currentIdx === 0) {
      setActiveComponent("kills");
      setCurrentIdx(kills.length - 1);
    } else {
      setCurrentIdx(currentIdx - 1);
    }
  }, [activeComponent, currentIdx, kills.length]);

  const goForward = useCallback(() => {
    if (activeComponent === "kills" && currentIdx === kills.length - 1) {
      setActiveComponent("youKilled");
      setCurrentIdx(0);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }, [activeComponent, currentIdx, kills.length]);

  useEffect(() => {
    setActiveComponent("kills");
    setCurrentIdx(0);
  }, [lines]);

  const onGenerateClicked = useCallback(async () => {
    setShouldSave(true);
  }, []);

  const onImageSaved = useCallback(async (data: DownloadedImage) => {
    setFiles((prev) => [...prev, data]);
  }, []);

  useEffect(() => {
    const downloadFiles = async () => {
      if (files.length === youKilled.length + kills.length) {
        const zip = new JSZip();
        for (const image of files) {
          zip.file(image.name, image.file);
        }

        const zipFile = await zip.generateAsync({ type: "blob" });
        FileSaver.saveAs(zipFile, "images.zip");

        setFiles([]);
        setShouldSave(false);
      }
    };

    downloadFiles();
  }, [files, kills.length, shouldSave, youKilled.length]);

  if (!lines) {
    return null;
  }

  return (
    <div className={styles.Wrapper}>
      <button
        className={classNames(styles.Button, styles.Left)}
        disabled={isBackDisabled}
        onClick={goBack}
      >
        {`<`}
      </button>
      {kills.map((killsLine, idx) => (
        <KillFeedPreview
          key={idx}
          activeComponent={activeComponent}
          isVisible={
            shouldSave || (activeComponent === "kills" && currentIdx === idx)
          }
          imagePrefix="killfeed"
          onImageSaved={onImageSaved}
          lines={killsLine}
          idx={idx}
          consoleSettings={consoleSettings}
          textShadowValue={textShadowValue}
          shouldSave={shouldSave}
        />
      ))}
      {youKilled.map((youKilledLine, idx) => (
        <YouKilledPreview
          key={idx}
          activeComponent={activeComponent}
          idx={idx}
          onImageSaved={onImageSaved}
          imagePrefix="you-killed"
          isVisible={
            shouldSave ||
            (activeComponent === "youKilled" && currentIdx === idx)
          }
          lines={[youKilledLine]}
          consoleSettings={consoleSettings}
          textShadowValue={textShadowValue}
          shouldSave={shouldSave}
        />
      ))}
      <button
        className={classNames(styles.Button, styles.Right)}
        disabled={isForwardDisabled}
        onClick={goForward}
      >
        {`>`}
      </button>
      <Button
        style={{ marginRight: 18, marginLeft: 18, marginBottom: 18 }}
        onClick={onGenerateClicked}
        color="primary"
        variant="contained"
      >
        Generate ZIP file
      </Button>
      {shouldSave && <div className={styles.Overlay}>Generating zip...</div>}
    </div>
  );
};
