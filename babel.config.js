module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src/'],
          extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
        },
      ],
    ],
    presets: ['babel-preset-expo'],
  };
};
