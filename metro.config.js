// metro.config.js
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// ВАЖНО: достаём исходные transformer/resolver из config
const { transformer, resolver } = config;

// Подключаем трансформер для SVG
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// Разрешаем импорт .svg как источников
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

// (опционально) алиас "@"
config.resolver.alias = {
  ...(config.resolver.alias ?? {}),
  "@": path.resolve(__dirname, "src"),
};

// Оборачиваем NativeWind (v4)
module.exports = withNativeWind(config, { input: "./src/app/global.css" });
