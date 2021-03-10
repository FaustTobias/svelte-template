const fs = require("fs");

let snowpack = fs.readFileSync("snowpack.config.js", "utf8");
const plugins = process.argv.slice(2);

snowpack = snowpack.replace(/(plugins:\s*\[)/, "$1" + plugins.map(JSON.stringify).join(", ") + ",");

fs.writeFileSync("snowpack.config.js", snowpack);
