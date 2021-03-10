// This script will add prettier with an editorconfig file to the project.

const { editJsonFile, installPackage, writeCodeFile } = require("./util");

installPackage(["prettier", "prettier-plugin-svelte"], { dev: true });

writeCodeFile(
    "prettier.config.js",
    `
        /** @type {import("prettier").Options } */
        module.exports = {
            semi: true,
            singleQuote: false,
            printWidth: 120,
            useTabs: false,
            tabWidth: 4,
            plugins: [require("prettier-plugin-svelte")],
        };
    `
);

writeCodeFile(
    ".prettierignore",
    `
        .yarn/
        build/
        node_modules/
        .pnp.js
    `
);

writeCodeFile(
    ".editorconfig",
    `
        root = true

        [*]
        indent_style = space
        indent_size = 4
        charset = utf-8
        trim_trailing_whitespace = true
        insert_final_newline = true
        end_of_line = lf

        [*.{yml,yaml,md}]
        indent_size = 2

        [Makefile]
        indent_style = tab
    `
);

editJsonFile(".vscode/extensions.json", (ext) => {
    const recommendations = new Set(ext.recommendations ?? []);
    recommendations.add("editorconfig.editorconfig");
    recommendations.add("esbenp.prettier-vscode");
    ext.recommendations = [...recommendations];
});

editJsonFile("package.json", (pkg) => {
    pkg.scripts = pkg.scripts ?? {};
    pkg.scripts.format = "prettier --write . **/*.svelte";
    pkg.scripts["format:check"] = "prettier --check . **/*.svelte";
});
