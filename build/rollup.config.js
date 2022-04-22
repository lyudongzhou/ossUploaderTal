/*
 * @Author: lyudongzhou
 * @Date: 2022-04-18 17:58:30
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-22 16:27:26
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
import PostCSS from 'rollup-plugin-postcss'
import vue from "rollup-plugin-vue";
import { resolve } from "path";
console.log(Object.keys(dependencies))
const FORMAT = {
  'ES': 'es',
  'CJS': 'cjs',
  'UMD': 'umd'
}
const base = {
  input: resolve(__dirname, '../src/index.ts'),
  external: [
    'ali-oss',
    'axios',
    'core-js',
    'element-plus',
    'regenerator-runtime',
    'url',
    'uuid',
    'vue'
  ],
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    json(),
    typescript(),
    vue(),
    PostCSS(),
    terser(),
    sourcemaps(),
    commonjs(),
  ]
};
const output = function (format) {
  return {
    name,
    dir: resolve(__dirname, `../dist/${format}`),
    format,
    sourcemap: true,
  }
}
export default [
  { ...base, output: output(FORMAT.ES) },
  { ...base, output: output(FORMAT.CJS) },
  { ...base, output: output(FORMAT.UMD) },
]
