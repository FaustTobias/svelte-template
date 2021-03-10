const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

pkg.scripts = pkg.scripts ?? {};
pkg.scripts.format = "prettier --write . **/*.svelte";
pkg.scripts["format:check"] = "prettier . **/*.svelte";

fs.writeFileSync("package.json", JSON.stringify(pkg));
