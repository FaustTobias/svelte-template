// This file fixes resolve issues since sapper makes use of a node_modules folder inside src.
// May be merged with this PR: https://github.com/sveltejs/sapper-template/pull/201

const fs = require("fs");

let config = fs.readFileSync("rollup.config.js", "utf8");

config = config.replace(
    "import resolve from",
    `
import alias from '@rollup/plugin-alias';
import resolve from
    `.trim()
);

config = config.replace(
    /(\t+)resolve\(/gm,
    `
$1alias(\{
$1\tentries: [
$1\t\t\{
$1\t\t\tfind: "@sapper",
$1\t\t\treplacement: \`\${__dirname}/src/node_modules/@sapper\`
$1\t\t},
$1\t\t\{
$1\t\t\tfind: "images",
$1\t\t\treplacement: \`\${__dirname}/src/node_modules/images\`
$1\t\t}
$1\t]
$1}),
$1resolve(
    `.trim()
);

fs.writeFileSync("rollup.config.js", config);
