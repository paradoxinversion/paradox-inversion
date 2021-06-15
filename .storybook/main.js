// const config = require("../sharedSettings");


module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss"
  ]
}
// const path = require("path")
// module.exports = {
//   stories: [
//     // Paths to the story files
//     "../stories/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-controls','@storybook/addon-postcss'],
  
// };