module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@actions': './src/store/actions',
          '@reducers': './src/store/reducers',
          // '@selectors': './src/store/selectors',
          '@components': './src/components',
          '@screens': './src/screens',
          '@store': './src/store',
          // '@util': './src/util',
          // '@styling': './src/styling',
          // '@assets': './src/assets',
          '@navStacks': './src/navStacks',
          // '@prototypes': './src/prototypes',
        },
      }
    ]
  ]
};
