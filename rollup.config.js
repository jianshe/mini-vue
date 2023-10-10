import typescript from "rollup-plugin-typescript";

export default {
  input: "./packages/vue/src/index.ts",
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    })
  ],
  output: [
    {
      format: "cjs",
      file: "packages/vue/dist/guide-mini-vue.cjs.js",
      sourcemap: true,
    },
    {
      name: "vue",
      format: "es",
      file: "packages/vue/dist/guide-mini-vue.ejs.js",
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
