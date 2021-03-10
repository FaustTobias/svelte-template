// This script will add lint-staged to the project.

const { editJsonFile, installPackage, writeCodeFile } = require("./util");

installPackage(["husky@^4", "lint-staged"]);

editJsonFile("package.json", (pkg) => {
    const scripts = pkg.scripts || {};

    pkg.husky = {
        hooks: {
            "pre-commit": "yarn lint-staged",
        },
    };

    pkg["lint-staged"] = Object.assign(
        {},
        [
            scripts["format"] && {
                "*.{js,ts,json,yml,yaml}": "prettier --write",
            },
        ].filter(Boolean)
    );
});
