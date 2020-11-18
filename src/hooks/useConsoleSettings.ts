import { useState } from "react";

type TextShadow = {
  h: number;
  v: number;
  blur: number;
  color: string;
};

export type TextAlignValue = "left" | "right" | "center";

export function useConsoleSettings() {
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [lineSpacing, setLineSpacing] = useState(6);
  const [textAlign, setTextAlign] = useState<TextAlignValue>("left");
  const [textShadow, setTextShadow] = useState<TextShadow>({
    h: 0,
    v: 0,
    blur: 0,
    color: "#fff",
  });

  return {
    fontSize,
    fontFamily,
    lineSpacing,
    textShadow,
    textAlign,
    setTextAlign,
    setFontFamily,
    setFontSize,
    setLineSpacing,
    setTextShadow,
  };
}
