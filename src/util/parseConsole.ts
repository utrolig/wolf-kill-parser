export type TextPart = {
  color: string;
  text: string;
};

const colorMap: [string, string][] = [
  ["0 P p ° Ð ð", "#000000"],
  ["1 Q q ± Ñ ñ", "#ff0000"],
  ["2 R r ² Ò ò", "#00ff00"],
  ["3 S s ³ Ó ó", "#ffff00"],
  ["4 T t Ž Ô ô", "#0000ff"],
  ["5 U u µ Õ õ", "#00ffff"],
  ["6 V v ¶ Ö ö", "#ff00ff"],
  ["7 W w · × ÷", "#ffffff"],
  ["8 X x ž Ø ø", "#ff7f00"],
  ["9 Y y ¹ Ù ù", "#7f7f7f"],
  [": Z z º Ú ú", "#bfbfbf"],
  ["; [ { » Û û", "#bfbfbf"],
  ["< \\ | Œ Ü ü", "#007f00"],
  ["	= ] } œ Ý ý", "#7f7f00"],
  ["> ^ ~ Ÿ Þ þ", "#00007f"],
  ["	? _ ¿ ß ÿ", "#7f0000"],
  ["@ ` À à", "#7f3f00"],
  ["! A a ¡ Á á", "#ff9919"],
  ['" B b ¢ Â â', "#007f7f"],
  ["# C c £ Ã ã", "#7f007f"],
  ["$ D d € Ä ä", "#007fff"],
  ["% E e ¥ Å å", "#7f00ff"],
  ["& F f Š Æ æ", "#3399cc"],
  ["' G g § Ç ç", "#ccffcc"],
  ["( H h š È è", "#006633"],
  [") I i © É é", "#ff0033"],
  ["* J j ª Ê ê", "#b21919"],
  ["+ K k « Ë ë", "#993300"],
  [", L l ¬ Ì ì", "#cc9933"],
  ["- M m ­ Í í", "#999933"],
  [". N n ® Î î", "#ffffbf"],
  ["/ O o ¯ Ï ï", "#ffff7f"],
];

export type ParsedOutput = {
  kills: Array<TextPart[][]>;
  youKilled: TextPart[][];
};

const splitByColorDelimiters = (s: string) => s.split(/(?=\^.)/g);
const removeSkipNotify = (s: string) => s.replace(/\[skipnotify\]/g, "");
const toColoredParts = (parts: string[]) =>
  parts.map((part) => {
    const text = part.replace(/\^./g, "");
    const matches = part.match(/\^./)!;
    if (!matches?.length) {
      const textPart: TextPart = {
        color: "#ffffff",
        text,
      };
      return textPart;
    }

    const [colorCode] = matches;

    const colorChar = colorCode.replace("^", "");

    const textPart: TextPart = {
      color: colorMap.find(([chars, color]) => chars.includes(colorChar))![1],
      text,
    };

    return textPart;
  });

export const parseConsole = (
  text: string,
  maxKillFeedLines: number
): ParsedOutput => {
  const lines = text.split("\n");
  const kills = lines
    .filter((s) => s.includes("was"))
    .map(removeSkipNotify)
    .map(splitByColorDelimiters)
    .map(toColoredParts)
    .reduce((acc, line, idx) => {
      if (idx === 0) {
        return [[line]];
      }

      const lastLineCollection = acc[acc.length - 1];

      if (idx >= maxKillFeedLines) {
        const newLineCollection = [...lastLineCollection.slice(1), line];
        return [...acc, newLineCollection];
      }

      return [...acc, [...lastLineCollection, line]];
    }, [] as Array<TextPart[][]>);

  const youKilled = lines
    .filter((s) => s.includes("was"))
    .map(removeSkipNotify)
    .map((line) => {
      const victimEndIdx = line.indexOf(" was");
      const final = `You killed ${line.substring(0, victimEndIdx)}`;
      return final;
    })
    .map(splitByColorDelimiters)
    .map(toColoredParts);

  return { kills, youKilled };
};
