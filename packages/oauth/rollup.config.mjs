import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { dts } from "rollup-plugin-dts";
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
    },
    plugins: [nodeResolve(), typescript(), terser()],
    external: ["react", "js-cookie"],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm",
        banner: '/// <reference types="apple-signin-api" />\n/// <reference types="google.accounts" />',
      },
    ],
    plugins: [
      dts({
        respectExternal: true,
      }),
    ],
  },
]);
