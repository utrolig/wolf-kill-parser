import { useState } from "react";

type TextShadow = {
  h: number;
  v: number;
  blur: number;
  color: string;
};

export type TextAlignValue = "left" | "right" | "center";

export type ConsoleSettings = ReturnType<typeof useConsoleSettings>;

export function useConsoleSettings() {
  const [killsFontSize, setKillsFontsize] = useState(20);
  const [youKilledFontSize, setYouKilledFontsize] = useState(48);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [lineSpacing, setLineSpacing] = useState(6);
  const [textShadow, setTextShadow] = useState<TextShadow>({
    h: 0,
    v: 0,
    blur: 0,
    color: "#fff",
  });
  const [youKilledBottomOffset, setYouKilledBottomOffset] =
    useState<number>(280);
  const [killFeedTopOffset, setKillFeedTopOffset] = useState<number>(32);
  const [killFeedLeftOffset, setKillFeedLeftOffset] = useState<number>(32);

  return {
    killsFontSize,
    fontFamily,
    lineSpacing,
    textShadow,
    youKilledFontSize,
    youKilledBottomOffset,
    killFeedTopOffset,
    killFeedLeftOffset,
    setFontFamily,
    setKillsFontsize,
    setLineSpacing,
    setTextShadow,
    setYouKilledFontsize,
    setKillFeedLeftOffset,
    setKillFeedTopOffset,
    setYouKilledBottomOffset,
  };
}
