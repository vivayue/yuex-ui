import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
import packageJson from "./package.json";

const { name, version } = packageJson;
const banner = `/* ${name} yuexin version ${version} */`;
const plugins = [
  postcss({ extensions: [".less"], extract: `dist/${name}.css` }),
  resolve({ jsnext: true, main: true, browser: true }),
  babel({
    babelrc: false,
    include: "src/**/*.js",
    runtimeHelpers: true,
    presets: [
      [
        "env",
        {
          modules: false
        }
      ],
      "stage-2",
      "es2015-rollup"
    ]
  }),
  replace({
    __VERSION__: version
  })
];

export default [
  {
    input: "src/index.js",
    output: [
      {
        banner,
        file: `dist/${name}.common.js`,
        format: "cjs"
      },
      {
        banner,
        file: `dist/${name}.esm.js`,
        format: "es"
      }
    ],
    plugins: plugins,
    external: ["vue"]
  },
  {
    input: "src/index.js",
    output: {
      file: `dist/${name}.js`,
      format: "umd",
      name: "MuseUI",
      globals: {
        vue: "Vue"
      }
    },
    plugins: [...plugins, uglify()],
    external: ["vue"]
  }
];