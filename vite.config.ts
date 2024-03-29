import { defineConfig } from "vite";
import { parse } from "dotenv";
import fs from "fs";
import path from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from "vite-plugin-svgr";

const getEnvFile = (envFile: string) => {
  const filepath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath);
  }
};

const getEnv = (mode: string) => {
  const modeSpecificEnvFile = getEnvFile(`.env.${mode}`);
  const rootEnvFile = getEnvFile(".env");

  if (!modeSpecificEnvFile && !rootEnvFile) return {};

  const fileToParse = modeSpecificEnvFile || rootEnvFile;
  const parsedEnv = parse(fileToParse);

  const REACT_APP = /^REACT_APP_/i;
  const VITE = /^VITE_/i;

  const filteredEnvs = Object.entries(parsedEnv).reduce((acc, [key, value]) => {
    if (REACT_APP.test(key) || VITE.test(key)) {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, string>);

  return {
    "process.env": {
      ...filteredEnvs,
      NODE_ENV: mode,
    },
  };
};

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    build: {
      outDir: "build",
    },
    plugins: [reactRefresh(), svgr()],
    define: {
      ...getEnv(mode),
    },
  });
