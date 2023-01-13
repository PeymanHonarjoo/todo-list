const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
});
// module.exports = {
//   publicPath:
//     process.env.NODE_ENV === "production"
//       ? "/" + process.env.CI_PROJECT_NAME + "/"
//       : "/",
// };
// module.exports = {
//   mode: "production",
// };
