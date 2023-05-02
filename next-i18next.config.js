const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "gu"],
    defaultLocale: "en",
  },
    localePath: path.resolve("./public/locales"),
};
console.log("path", path.resolve("./public/locales"));
