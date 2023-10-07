import pkg from "./package.json";
import typescript from "rollup-plugin-typescript";

export default {
  input: "./src/index.ts",
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    })
  ],
  output: [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
    },
    {
      name: "vue",
      format: "es",
      file: pkg.module,
      sourcemap: true,
    },
  ],
  onwarn: (msg, warn) => {
    // 忽略 Circular 的错误
    if (!/Circular/.test(msg)) {
      warn(msg);
    }
  },
};
