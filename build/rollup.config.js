/*
 * @Author: lyudongzhou
 * @Date: 2022-04-18 17:58:30
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-21 10:37:46
 * @Description: 请填写简介
 */
// import babel, { getBabelOutputPlugin, getBabelInputPlugin } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { name, dependencies } from "../package.json";
import typescript from 'rollup-plugin-typescript';
import json from '@rollup/plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
const FORMAT = {
  'ES': 'es',
  'CJS': 'cjs',
  'UMD': 'umd'
}
const base = {
  input: resolve(__dirname, '../src/index.ts'),
  external: Object.keys(dependencies),
  plugins: [
    // terser(),
    sourcemaps(),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
    typescript(),
  ]
};
const output = function (format) {
  return {
    name,
    dir: resolve(__dirname, `../dist/${format}`),
    format,
  }
}
export default [
  { ...base, output: output(FORMAT.ES) },
  { ...base, output: output(FORMAT.CJS) },
  { ...base, output: output(FORMAT.UMD) },
]
