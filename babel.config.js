module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-inline-import',
      {
        extensions: ['webjs'],
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@lib': './lib',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
    'react-native-paper/babel',
    [
      'babel-plugin-styled-components',
      {
        pure: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
