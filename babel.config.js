module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            images: './app/assets/images',
            components: './app/components',
            screens: './app/screens',
            services: './app/services',
            utils: './app/utils',
            helpers: './app/helpers',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
    ],
  };
};
