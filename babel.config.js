module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".json",
            ".native.ts",
            ".native.tsx",
            ".web.ts",
            ".web.tsx",
          ],
          alias: {
            "@": "./src",
          },
        },
      ],
    ],
  };
};
