import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ConsoleSettings } from "../hooks/useConsoleSettings";
import { ParsedOutput } from "../util/parseConsole";
import { LinesPreview } from "./LinesPreview";
import styles from "./LinesManager.module.css";

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
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeComponent, setActiveComponent] = useState<"youKilled" | "kills">(
    "kills"
  );
  const { youKilled, kills } = lines;

  const isBackDisabled = useMemo(() => {
    return activeComponent === "kills" && currentIdx === 0;
  }, [activeComponent, currentIdx]);

  const isForwardDisabled = useMemo(() => {
    return (
      activeComponent === "youKilled" && currentIdx === youKilled.length - 1
    );
  }, [activeComponent, currentIdx]);

  const goBack = useCallback(() => {
    if (activeComponent === "youKilled" && currentIdx === 0) {
      setActiveComponent("kills");
      setCurrentIdx(kills.length - 1);
    } else {
      setCurrentIdx(currentIdx - 1);
    }
  }, [activeComponent, currentIdx, lines]);

  const goForward = useCallback(() => {
    if (activeComponent === "kills" && currentIdx === kills.length - 1) {
      setActiveComponent("youKilled");
      setCurrentIdx(0);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }, [activeComponent, currentIdx, lines]);

  useEffect(() => {
    setActiveComponent("kills");
    setCurrentIdx(0);
  }, [lines]);

  const getCurrentLine = () => {
    if (activeComponent === "kills") {
      return kills[currentIdx];
    }

    return [youKilled[currentIdx]];
  };

  if (!lines) {
    return null;
  }

  return (
    <div className={styles.Wrapper}>
      <button disabled={isBackDisabled} onClick={goBack}>
        Previous
      </button>
      <LinesPreview
        activeComponent={activeComponent}
        lines={getCurrentLine()}
        consoleSettings={consoleSettings}
        textShadowValue={textShadowValue}
      />
      <button disabled={isForwardDisabled} onClick={goForward}>
        Next
      </button>
    </div>
  );
};
