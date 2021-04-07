const production = !process.env.ROLLUP_WATCH;

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
