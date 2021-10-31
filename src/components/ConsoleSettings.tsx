import React from "react";
import {
  TextAlignValue,
  useConsoleSettings,
} from "../hooks/useConsoleSettings";
import { fonts } from "../assets/fonts";
import styles from "./ConsoleSettings.module.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";

export type ConsoleSettingsProps = {
  settings: ReturnType<typeof useConsoleSettings>;
};

export const ConsoleSettings: React.FC<ConsoleSettingsProps> = ({
  settings,
}) => {
  return (
    <div className={styles.container}>
      <FormControl>
        <InputLabel shrink id="font-family">
          Font Family
        </InputLabel>
        <Select
          labelId="font-family"
          id="font-family-select"
          value={settings.fontFamily}
          native
          onChange={(e) => settings.setFontFamily(e.target.value as string)}
        >
          {fonts.map(({ family }) => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>You killed Fontsize</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setYouKilledFontsize(newValue as number)
          }
          value={settings.youKilledFontSize}
          aria-labelledby="discrete-slider-small-steps"
          step={0.5}
          marks
          min={8}
          max={120}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>You killed bottom offset</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setYouKilledBottomOffset(newValue as number)
          }
          value={settings.youKilledBottomOffset}
          aria-labelledby="discrete-slider-small-steps"
          step={0.5}
          marks
          min={0}
          max={800}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>Kill feed top offset</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setKillFeedTopOffset(newValue as number)
          }
          value={settings.killFeedTopOffset}
          aria-labelledby="discrete-slider-small-steps"
          step={0.5}
          marks
          min={8}
          max={48}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>Kill feed left offset</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setKillFeedLeftOffset(newValue as number)
          }
          value={settings.killFeedLeftOffset}
          aria-labelledby="discrete-slider-small-steps"
          step={0.5}
          marks
          min={8}
          max={48}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>Font Size</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setKillsFontsize(newValue as number)
          }
          value={settings.killsFontSize}
          aria-labelledby="discrete-slider-small-steps"
          step={0.5}
          marks
          min={8}
          max={48}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>Line spacing</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setLineSpacing(newValue as number)
          }
          value={settings.lineSpacing}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          marks
          min={2}
          max={24}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <TextField
          label="Text shadow horizontal"
          value={settings.textShadow.h}
          variant="outlined"
          onChange={(e) =>
            settings.setTextShadow({
              ...settings.textShadow,
              h: Number(e.target.value),
            })
          }
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <TextField
          label="Text shadow vertical"
          value={settings.textShadow.v}
          onChange={(e) =>
            settings.setTextShadow({
              ...settings.textShadow,
              v: Number(e.target.value),
            })
          }
          variant="outlined"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <TextField
          label="Text shadow blur"
          value={settings.textShadow.blur}
          onChange={(e) =>
            settings.setTextShadow({
              ...settings.textShadow,
              blur: Number(e.target.value),
            })
          }
          variant="outlined"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <TextField
          label="Text shadow color"
          value={settings.textShadow.color}
          onChange={(e) =>
            settings.setTextShadow({
              ...settings.textShadow,
              color: e.target.value,
            })
          }
          variant="outlined"
        />
      </FormControl>
    </div>
  );
};
