/** @type {import("prettier").Options } */
module.exports = {
    semi: true,
    singleQuote: false,
    printWidth: 120,
    useTabs: false,
    tabWidth: 4,
    plugins: [require("prettier-plugin-svelte")],
};
