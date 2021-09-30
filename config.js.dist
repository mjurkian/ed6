/**
 * ==============
 * Project config
 * ==============
 */
// Modules
const path = require("path");


// Base config
const config = module.exports = {
  srcPath: path.resolve("./src/"),
  distPath: path.resolve("./dist"),
  distPublicPath: "/dist/", // Public url path
  useBrowserSync: true,
  strict: false
}

/**
 * ==============
 * Optional config
 * ==============
 */
// Optional config
config.browserSync = {
  host: "localhost",
  port: 3000,
  proxy: "http://michal-ed6.local",
  files: ["*.css", "*.js"]
}
