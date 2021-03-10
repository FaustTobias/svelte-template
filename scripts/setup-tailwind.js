// This file adds tailwind with postcss to the rollup config.

const fs = require("fs");

fs.writeFileSync(
    "tailwind.config.js",
    `const production = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV
module.exports = {
  future: { // for tailwind 2.0 compat
    purgeLayersByDefault: true, 
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    // for tailwind UI users only
    // require('@tailwindcss/ui'),
    // other plugins here
  ],
  purge: {
    content: [
      "./src/**/*.svelte",
      // may also want to include base index.html
    ], 
    enabled: production // disable purge in dev
  },
};
`
);

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
        /(<script lang="ts">)/,
        `$1
\timport Tailwind from "./Tailwind.svelte";
`
    );
    app = app.replace(
        /(<main>)/,
        `<!-- Embed the tailwind stylesheets -->
<Tailwind />

$1`
    );
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
