import { useCallback, useState } from "react";

type TextShadow = {
  h: number;
  v: number;
  blur: number;
  color: string;
};

export type ConsoleSettings = ReturnType<typeof useConsoleSettings>;

export type SettingsObject = {
  name: string;
  killsFontSize: number;
  youKilledFontSize: number;
  fontFamily: string;
  lineSpacing: number;
  textShadow: TextShadow;
  youKilledBottomOffset: number;
  killFeedXOffset: number;
  killFeedYOffset: number;
  maxKillFeedLines: number;
  consoleScrollDownwards: number;
  killFeedPositionY: number;
  killFeedPositionX: number;
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
  const [killFeedYOffset, setKillFeedYOffset] = useState<number>(32);
  const [killFeedXOffset, setKillFeedXOffset] = useState<number>(32);
  const [maxKillFeedLines, setMaxKillFeedLines] = useState<number>(4);
  const [consoleScrollDownwards, setConsoleScrollDownwards] = useState(1);
  const [killFeedPositionX, setKillFeedPositionX] = useState(0);
  const [killFeedPositionY, setKillFeedPositionY] = useState(0);

  const updateSettings = useCallback(
    ({
      killFeedYOffset,
      youKilledFontSize,
      consoleScrollDownwards,
      fontFamily,
      killFeedPositionX,
      killFeedPositionY,
      killFeedXOffset,
      killsFontSize,
      lineSpacing,
      maxKillFeedLines,
      resolution,
      textShadow,
      youKilledBottomOffset,
    }: SettingsObject) => {
      setConsoleScrollDownwards(consoleScrollDownwards);
      setFontFamily(fontFamily);
      setKillFeedXOffset(killFeedXOffset);
      setKillFeedYOffset(killFeedYOffset);
      setKillFeedPositionX(killFeedPositionX);
      setKillFeedPositionY(killFeedPositionY);
      setKillsFontsize(killsFontSize);
      setLineSpacing(lineSpacing);
      setMaxKillFeedLines(maxKillFeedLines);
      setResolution(resolution);
      setTextShadow(textShadow);
      setYouKilledBottomOffset(youKilledBottomOffset);
      setYouKilledFontsize(youKilledFontSize);
    },
    []
  );

  return {
    consoleScrollDownwards,
    fontFamily,
    killFeedPositionX,
    killFeedPositionY,
    killFeedXOffset,
    killFeedYOffset,
    killsFontSize,
    lineSpacing,
    maxKillFeedLines,
    resolution,
    textShadow,
    youKilledBottomOffset,
    youKilledFontSize,
    setConsoleScrollDownwards,
    setFontFamily,
    setKillFeedXOffset,
    setKillFeedYOffset,
    setKillFeedPositionX,
    setKillFeedPositionY,
    setKillsFontsize,
    setLineSpacing,
    setMaxKillFeedLines,
    setResolution,
    setTextShadow,
    setYouKilledBottomOffset,
    setYouKilledFontsize,
    updateSettings,
  };
}
