const production = process.env.NODE_ENV === "production";

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
        content: ["./src/**/*.svelte"],
        enabled: production, // disable purge in dev
    },
};
