/**
 * @typedef InstallPackageOptions
 * @property {boolean} dev Install as development dependency
 */

/**
 *
 * @param {string | string[]} pkg
 * @param {InstallPackageOptions} options
 */
function installPackage(pkg, options) {
    if (!Array.isArray(pkg)) {
        pkg = [pkg];
    }

    const cp = require("child_process");
    cp.execSync(`yarn add ${options?.dev ? "-D " : ""}${pkg.join(" ")}`, {
        stdio: "inherit",
    });
}

module.exports = {
    installPackage,
};
