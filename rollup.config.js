import VuePlugin from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import PostCSS from "rollup-plugin-postcss";
export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/app.js",
      format: "esm",
      //   sourcemap: "inline",
    },
    plugins: [
      nodeResolve({
        browser: true,
        preferBuiltins: false,
      }),
      json(),
      typescript({
        // Absolute path to import correct config in e2e tests
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
      }),
      VuePlugin(),
      PostCSS(),
    //   terser(),
    //   sourcemaps(),
      commonjs(),
    ],
    external: [
      "ali-oss",
      "axios",
      "core-js",
      "element-plus",
      "regenerator-runtime",
      "url",
      "uuid",
      "vue",
    ],
  },
];
