/*
 * @Author: lyudongzhou
 * @Date: 2022-04-18 17:58:30
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-19 11:11:35
 * @Description: 请填写简介
 */
import babel, { getBabelOutputPlugin, getBabelInputPlugin } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { name, dependencies } from "../package.json";
import { resolve } from "path";
const FORMAT = {
  'ES': 'es',
  'CJS': 'cjs',
  'UMD': 'umd'
}
const base = (format) => {
  switch (format) {
    case "es":
    case "cjs":
      return {
        input: resolve(__dirname, '../src/index.ts'),
        external: Object.keys(dependencies),
        plugins: [
          nodeResolve(),
          commonjs(),
          getBabelOutputPlugin({
            allowAllFormats: true,
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  "corejs": 3
                }
              ]
            ]
          }),
          getBabelInputPlugin({
            babelHelpers: "bundled",
            extensions: ['.js', '.ts'],
            presets: ["@babel/preset-typescript"]
          }),
        ]
      };
    case "umd":
      return {
        input: resolve(__dirname, '../src/index.ts'),
        external: Object.keys(dependencies),
        plugins: [
          nodeResolve({
            browser: true
          }),
          commonjs(),
          babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.ts'],
            exclude: [/core-js/],
            presets: [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "usage",
                  "corejs": 3,
                  modules: false,
                }
              ],
              "@babel/preset-typescript"
            ],
          }),
        ]
      };
  }
};
const output = function (format) {
  return {
    name,
    dir: resolve(__dirname, `../dist/${format}`),
    // format 参数，决定输出需要满足哪一种模块化规范
    format,
  }
}
export default [
  { ...base(FORMAT.ES), output: output(FORMAT.ES) },
  { ...base(FORMAT.CJS), output: output(FORMAT.CJS) },
  { ...base(FORMAT.UMD), output: output(FORMAT.UMD) },
]
