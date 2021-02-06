const fs = require('fs');
const marked = require('marked');
const wrapHtml = require('./wrapHtml.js');

const [inFilePath, outFilePath] = process.argv.slice(2);

if (!inFilePath) {
    throw new Error('You have to specify a path to .md-file!');
}

const content = marked(fs.readFileSync(inFilePath, 'utf8'));

fs.writeFileSync(outFilePath, wrapHtml(content));
