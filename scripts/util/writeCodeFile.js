/**
 * Writes the given content to the file. Trims leading spaces.
 *
 * @param {string} path The path to the file.
 * @param {string} content The content.
 */
function writeCodeFile(path, content) {
    const lines = content.split(/\r?\n/);

    let minLeadingSpaces = lines.reduce((prev, current) => {
        if (current.trim() === "") {
            return prev;
        }

        const leadingSpaces = current.length - current.trimStart().length;
        return leadingSpaces < prev ? leadingSpaces : prev;
    }, Number.MAX_SAFE_INTEGER);

    if (minLeadingSpaces === Number.MAX_SAFE_INTEGER) {
        minLeadingSpaces = 0;
    }

    content = lines
        .map((line) => line.slice(minLeadingSpaces))
        .join("\n")
        .trim();

    require("fs").writeFileSync(path, content);
}

module.exports = {
    writeCodeFile,
};
