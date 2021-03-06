import typescript from "rollup-plugin-typescript";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/emmet-monaco.common.js",
        format: "cjs",
        exports: "named"
      },
      {
        file: "dist/emmet-monaco.esm.js",
        format: "esm",
        exports: "named"
      },
      {
        file: "dist/emmet-monaco.js",
        name: "emmetMonaco",
        format: "iife"
      }
    ],
    watch: {
      exclude: "node_modules/**"
    },
    plugins: [
      commonjs(),
      resolve(),
      typescript(),
      {
        name: "json",
        transform(code, id) {
          return id.slice(-5) === ".json" ? `export default ${code}` : null;
        }
      }
    ],
    external: ["monaco-editor"]
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/emmet-monaco.common.min.js",
        format: "cjs",
        exports: "named"
      },
      {
        file: "dist/emmet-monaco.esm.min.js",
        format: "esm",
        exports: "named"
      },
      {
        file: "dist/emmet-monaco.min.js",
        name: "emmetMonaco",
        format: "iife"
      }
    ],
    watch: {
      exclude: "node_modules/**"
    },
    plugins: [
      commonjs(),
      resolve(),
      typescript(),
      {
        name: "json",
        transform(code, id) {
          return id.slice(-5) === ".json" ? `export default ${code}` : null;
        }
      },
      terser()
    ],
    external: ["monaco-editor"]
  }
];
