import { useCallback, useState } from "react";

type TextShadow = {
  h: number;
  v: number;
  blur: number;
  color: string;
};

export type TextAlignValue = "left" | "right" | "center";

export type ConsoleSettings = ReturnType<typeof useConsoleSettings>;

export type SettingsObject = {
  name: string;
  killsFontSize: number;
  youKilledFontSize: number;
  fontFamily: string;
  lineSpacing: number;
  textShadow: TextShadow;
  youKilledBottomOffset: number;
  killFeedTopOffset: number;
  killFeedLeftOffset: number;
  maxKillFeedLines: number;
  consoleScrollDownwards: number;
  resolution: {
    height: number;
    width: number;
  };
};

export function useConsoleSettings() {
  const [killsFontSize, setKillsFontsize] = useState(20);
  const [youKilledFontSize, setYouKilledFontsize] = useState(48);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [lineSpacing, setLineSpacing] = useState(6);
  const [textShadow, setTextShadow] = useState<TextShadow>({
    h: 2,
    v: 2,
    blur: 1,
    color: "#000",
  });
  const [resolution, setResolution] = useState<{
    height: number;
    width: number;
  }>({ height: 1080, width: 1920 });
  const [youKilledBottomOffset, setYouKilledBottomOffset] =
    useState<number>(200);
  const [killFeedTopOffset, setKillFeedTopOffset] = useState<number>(32);
  const [killFeedLeftOffset, setKillFeedLeftOffset] = useState<number>(32);
  const [maxKillFeedLines, setMaxKillFeedLines] = useState<number>(4);
  const [consoleScrollDownwards, setConsoleScrollDownwards] = useState(1);

  const updateSettings = useCallback((params: SettingsObject) => {
    setKillsFontsize(params.killsFontSize);
    setYouKilledFontsize(params.youKilledFontSize);
    setFontFamily(params.fontFamily);
    setLineSpacing(params.lineSpacing);
    setTextShadow(params.textShadow);
    setYouKilledBottomOffset(params.youKilledBottomOffset);
    setKillFeedTopOffset(params.killFeedTopOffset);
    setKillFeedLeftOffset(params.killFeedLeftOffset);
    setMaxKillFeedLines(params.maxKillFeedLines);
    setResolution(params.resolution);
    setConsoleScrollDownwards(params.consoleScrollDownwards);
  }, []);

  return {
    consoleScrollDownwards,
    killsFontSize,
    fontFamily,
    lineSpacing,
    textShadow,
    youKilledFontSize,
    youKilledBottomOffset,
    killFeedTopOffset,
    killFeedLeftOffset,
    maxKillFeedLines,
    resolution,
    setConsoleScrollDownwards,
    setFontFamily,
    setKillsFontsize,
    setLineSpacing,
    setTextShadow,
    setYouKilledFontsize,
    setKillFeedLeftOffset,
    setKillFeedTopOffset,
    setYouKilledBottomOffset,
    setMaxKillFeedLines,
    setResolution,
    updateSettings,
  };
}
