/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

const path = require('path');

const {
  createSentryMetroSerializer,
} = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');

const lib = path.resolve(__dirname, './lib');

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

// possible fixes for EAS
// https://stackoverflow.com/questions/70071602/main-module-field-cannot-be-resolved-after-installing-apollo-client
// cjs or cjx in following link
// https://stackoverflow.com/questions/60124435/however-this-package-itself-specifies-a-main-module-field-that-could-not-be-r
// or maybe try running metro with expo "expo start -c" next time instead of normal start.
// or maybe sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json', 'd.ts']
// or maybe defaultConfig.resolver.sourceExts.push('cjs')
// https://github.com/thysultan/stylis/issues/233#issuecomment-687103919
// OR MAYBE THIS IN app.json❗
// {
//   "expo": {
//     ...,
//     "packagerOpts": {
//       "sourceExts": ["cjs"]
//     }
// }
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },

  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'json'],
  },

  watchFolders: [lib],

  serializer: {
    customSerializer: createSentryMetroSerializer(),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
