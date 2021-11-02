import React, { useEffect, useState } from "react";
import {
  SettingsObject,
  useConsoleSettings,
} from "../hooks/useConsoleSettings";
import { fonts } from "../assets/fonts";
import styles from "./ConsoleSettings.module.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import { Button, ButtonGroup } from "@material-ui/core";

export type ConsoleSettingsProps = {
  settings: ReturnType<typeof useConsoleSettings>;
};

const SettingsLocalStorageKey = "killparser.settings";

export const ConsoleSettings: React.FC<ConsoleSettingsProps> = ({
  settings,
}) => {
  const [settingsList, setSettingsList] = useState<
    Record<string, SettingsObject>
  >({});
  const [selectedSavedSetting, setSelectedSaveSetting] = useState<string>("");
  useEffect(() => {
    const savedSettingsList = window.localStorage.getItem(
      SettingsLocalStorageKey
    );

    if (savedSettingsList) {
      try {
        const parsedSettingsList = JSON.parse(savedSettingsList) as Record<
          string,
          SettingsObject
        >;
        setSettingsList(parsedSettingsList);

        const keys = Object.keys(parsedSettingsList);

        if (keys.length) {
          setSelectedSaveSetting(keys[0]);
        }
      } catch (err) {
        console.warn("Error while parsing settings list, clearing.");
        window.localStorage.removeItem(SettingsLocalStorageKey);
      }
    }
  }, []);

  const deleteCurrentSettings = () => {
    const keys = Object.keys(settingsList);

    const newKeys = keys.filter((s) => s !== selectedSavedSetting);

    const newSettingsList = newKeys.reduce((acc, item) => {
      acc[item] = settingsList[item];
      return acc;
    }, {} as Record<string, SettingsObject>);

    if (newKeys.length) {
      setSelectedSaveSetting(newKeys[0]);
    } else {
      setSelectedSaveSetting("");
    }

    setSettingsList(newSettingsList);
  };

  const saveCurrentSettings = () => {
    const name = window.prompt("Enter a name for the current settings");

    if (!name) return;
    const {
      consoleScrollDownwards,
      fontFamily,
      textShadow,
      youKilledBottomOffset,
      youKilledFontSize,
      killFeedXOffset,
      killFeedYOffset,
      killFeedPositionX,
      killFeedPositionY,
      killsFontSize,
      lineSpacing,
      maxKillFeedLines,
      resolution,
    } = settings;

    const currentSettings = {
      consoleScrollDownwards,
      fontFamily,
      textShadow,
      youKilledBottomOffset,
      youKilledFontSize,
      killFeedXOffset,
      killFeedYOffset,
      killFeedPositionX,
      killFeedPositionY,
      killsFontSize,
      lineSpacing,
      maxKillFeedLines,
      resolution,
      name,
    };

    const allSettings = {
      ...settingsList,
      [name]: currentSettings,
    };

    window.localStorage.setItem(
      SettingsLocalStorageKey,
      JSON.stringify(allSettings)
    );
    setSettingsList({
      ...settingsList,
      [name]: currentSettings,
    });

    setSelectedSaveSetting(name);
  };

  const loadSelectedSetting = () => {
    settings.updateSettings(settingsList[selectedSavedSetting]);
  };

  return (
    <div className={styles.container}>
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <TextField
          label="Width"
          value={settings.resolution.width}
          style={{ marginBottom: 18 }}
          variant="outlined"
          onChange={(e) =>
            settings.setResolution({
              ...settings.resolution,
              width: Number(e.target.value),
            })
          }
        />
        <TextField
          label="Height"
          value={settings.resolution.height}
          variant="outlined"
          style={{ marginBottom: 18 }}
          onChange={(e) =>
            settings.setResolution({
              ...settings.resolution,
              height: Number(e.target.value),
            })
          }
        />
      </FormControl>
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
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <InputLabel shrink id="font-family">
          Killfeed position Y
        </InputLabel>
        <Select
          labelId="font-family"
          id="font-family-select"
          value={settings.killFeedPositionY}
          native
          onChange={(e) =>
            settings.setKillFeedPositionY(Number(e.target.value))
          }
        >
          {[
            { value: 2, name: "Center" },
            { value: 1, name: "Bottom" },
            { value: 0, name: "Top" },
          ].map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <InputLabel shrink id="font-family">
          Killfeed position X
        </InputLabel>
        <Select
          labelId="font-family"
          id="font-family-select"
          value={settings.killFeedPositionX}
          native
          onChange={(e) =>
            settings.setKillFeedPositionX(Number(e.target.value))
          }
        >
          {[
            { value: 2, name: "Center" },
            { value: 1, name: "Right" },
            { value: 0, name: "Left" },
          ].map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <InputLabel shrink id="font-family">
          Killfeed direction
        </InputLabel>
        <Select
          labelId="font-family"
          id="font-family-select"
          value={settings.consoleScrollDownwards}
          native
          onChange={(e) =>
            settings.setConsoleScrollDownwards(Number(e.target.value))
          }
        >
          {[
            { value: 1, name: "Downwards" },
            { value: 0, name: "Upwards" },
          ].map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>Max number of killfeed lines</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setMaxKillFeedLines(newValue as number)
          }
          value={settings.maxKillFeedLines}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          marks
          min={3}
          max={10}
          valueLabelDisplay="auto"
        />
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
          step={1}
          marks
          min={0}
          max={800}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>Kill feed Y offset</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setKillFeedYOffset(newValue as number)
          }
          value={settings.killFeedYOffset}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          marks
          min={8}
          max={48}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl style={{ width: "100%", marginTop: 12 }}>
        <InputLabel shrink>Kill feed X offset</InputLabel>
        <Slider
          style={{ marginTop: 18 }}
          onChange={(e, newValue) =>
            settings.setKillFeedXOffset(newValue as number)
          }
          value={settings.killFeedXOffset}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
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
      <FormControl style={{ width: "100%", marginTop: 18 }}>
        <InputLabel shrink id="saved-settings">
          Saved settings
        </InputLabel>
        <Select
          labelId="saved-settings"
          placeholder="Saved settings"
          id="saved-settings-select"
          value={selectedSavedSetting}
          native
          onChange={(e) => setSelectedSaveSetting(e.target.value as string)}
        >
          {Object.keys(settingsList).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
        <ButtonGroup fullWidth style={{ marginTop: 18 }}>
          <Button onClick={loadSelectedSetting} variant="contained">
            Load
          </Button>
          <Button onClick={deleteCurrentSettings} variant="contained">
            Delete
          </Button>
          <Button onClick={saveCurrentSettings} variant="contained">
            Save
          </Button>
        </ButtonGroup>
      </FormControl>
    </div>
  );
};
