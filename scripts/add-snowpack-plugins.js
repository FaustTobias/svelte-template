const fs = require("fs");

module.exports = (plugins) => {
    let snowpack = fs.readFileSync("snowpack.config.js", "utf8");

    snowpack = snowpack.replace(/(plugins:\s*\[)/, "$1" + plugins.map(JSON.stringify).join(", ") + ",");

    fs.writeFileSync("snowpack.config.js", snowpack);
};

if (require.main === module) {
    module.exports(process.argv.slice(2));
}
