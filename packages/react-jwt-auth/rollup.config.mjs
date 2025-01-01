import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { dts } from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      // sourcemap: true,
    },
    plugins: [nodeResolve(), typescript(), terser()],
    external: ["dayjs", "react", "axios"],
    jsx: "react",
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
]);
