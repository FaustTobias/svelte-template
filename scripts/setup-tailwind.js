// This file adds tailwind with postcss to the rollup config.

const fs = require("fs");
const addSnowpackPlugins = require("./add-snowpack-plugins");
const { writeCodeFile, installPackage } = require("./util");

const isRollup = fs.existsSync("rollup.config.js");
const isSnowpack = fs.existsSync("snowpack.config.js");

fs.writeFileSync(
    "tailwind.config.js",
    `const production = ${isRollup ? "!process.env.ROLLUP_WATCH" : 'process.env.NODE_ENV === "production"'};

    module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    plugins: [
        // for tailwind UI users only
        // require('@tailwindcss/ui'),
    ],
    purge: {
        content: [
        "./src/**/*.svelte",
        ],
        enabled: production // disable purge in dev
    },
};
`
);

if (isSnowpack) {
    installPackage(["postcss", "postcss-cli", "tailwindcss", "autoprefixer", "@snowpack/plugin-postcss"], {
        dev: true,
    });

    writeCodeFile(
        "postcss.config.js",
        `
            /** @type {import("postcss").ProcessOptions } */
            module.exports = {
                plugins: [require("tailwindcss"), require("autoprefixer")],
            };
        `
    );

    addSnowpackPlugins(["@snowpack/plugin-postcss"]);
} else if (isRollup) {
    let rollup = fs.readFileSync("rollup.config.js", "utf8");
    rollup = rollup.replace(
        /(sveltePreprocess\({)/,
        `$1
\t\t\t\tpostcss: {
\t\t\t\t\tplugins: [
\t\t\t\t\t\trequire("tailwindcss"),
\t\t\t\t\t\trequire("autoprefixer"),
\t\t\t\t\t\trequire("postcss-nesting")
\t\t\t\t\t],
\t\t\t\t},
\t\t\t`
    );
    fs.writeFileSync("rollup.config.js", rollup);
}

fs.writeFileSync(
    "src/Tailwind.svelte",
    `<style global lang="postcss">
\t/* only apply purgecss on utilities, per Tailwind docs */
\t/* purgecss start ignore */
\t@tailwind base;
\t@tailwind components;
\t/* purgecss end ignore */

\t@tailwind utilities;
</style>
`
);

if (fs.existsSync("src/App.svelte")) {
    let app = fs.readFileSync("src/App.svelte", "utf8");
    app = app.replace(
        /(<script lang="(?:typescript|ts)">)/,
        `$1
\timport Tailwind from "./Tailwind.svelte";
`
    );

    if (isSnowpack) {
        app = app.replace(
            /(<\/script>)/,
            `$1

            <!-- Embed the tailwind stylesheets -->
            <Tailwind />`
        );
    } else {
        app = app.replace(
            /(<main>)/,
            `<!-- Embed the tailwind stylesheets -->
    <Tailwind />

    $1`
        );
    }
    fs.writeFileSync("src/App.svelte", app);
}

if (fs.existsSync("src/routes/_layout.svelte")) {
    let layout = fs.readFileSync("src/routes/_layout.svelte", "utf8");
    layout = layout.replace(
        /(<script lang="ts">)/,
        `$1
\timport Tailwind from "../Tailwind.svelte";
`
    );
    layout = layout.replace(
        /(<main>)/,
        `<!-- Embed the tailwind stylesheets -->
<Tailwind />

$1`
    );
    fs.writeFileSync("src/routes/_layout.svelte", layout);
}
