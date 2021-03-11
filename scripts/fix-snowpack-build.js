// This file fixes the snowpack build command which fails to resolve some modules.

const { editJsonFile, installPackage } = require("./util");

installPackage("@yarnpkg/pnpify", { dev: true });

editJsonFile("package.json", (pkg) => {
    pkg.scripts = pkg.scripts || {};

    if (pkg.scripts.build === "snowpack build") {
        pkg.scripts.build = "pnpify snowpack build";
    }
});
