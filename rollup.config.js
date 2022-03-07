import typescript from "@rollup/plugin-typescript";

export default {
    input: "./src/blaze.ts",
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    output: {
        file: "./dist/blaze.js",
        format: "esm",
        sourcemap: true,
    },
};