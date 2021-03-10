/**
 * Edit the given JSON file. Will create it as an empty object if it does not exist.
 *
 * @param {string} path The path of the file.
 * @param {(data: any) => void} callback A callback invoked with the content.
 */
function editJsonFile(path, callback) {
    const fs = require("fs");
    const { dirname } = require("path");

    let content;
    if (fs.existsSync(path)) {
        content = JSON.parse(fs.readFileSync(path, "utf8"));
    } else {
        fs.mkdirSync(dirname(path), { recursive: true });
        content = {};
    }

    callback(content);
    fs.writeFileSync(path, JSON.stringify(content));
}

module.exports = {
    editJsonFile,
};
