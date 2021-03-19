const fs = require('fs');
const marked = require('marked');
const wrapHtml = require('./helpers/wrapHtml.js');
const {
    hasExtension,
    getFileName,
    isRealDirectory,
} = require('./helpers/utils.js');

const [inPath, outPath] = process.argv.slice(2);

const parse = (inFilePath) => {
    const outFilePath = hasExtension(outPath)
        ? `${outPath}/${getFileName(inFilePath).toLowerCase()}.html`
        : outPath;

    const content = marked(fs.readFileSync(inFilePath, 'utf8'));
    fs.writeFileSync(outFilePath, wrapHtml(content));
};

if (isRealDirectory(inPath)) {
    if (!hasExtension(outPath))
        throw new Error(
            `You can only parse and save a folder of files into another folder, not a single file! \
            \nPlease, keep only the folder name as the output path.`
        );

    fs.readdirSync(inPath).forEach((file) => parse(`${inPath}/${file}`));
} else {
    parse(inPath);
}
