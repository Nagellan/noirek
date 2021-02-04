'use strict';

const fs = require('fs');
const marked = require('marked');
const prettier = require('prettier');

const [inFilePath, outFilePath] = process.argv.slice(2);

if (!inFilePath) {
    throw new Error('You have to specify a path to .md-file!');
}

const mdFileContent = fs.readFileSync(inFilePath, 'utf8');
const htmlFileContent = marked(mdFileContent);

fs.writeFileSync(outFilePath, html(htmlFileContent));

function html(bodyContent) {
    const prettierConfig = JSON.parse(fs.readFileSync('.prettierrc', 'utf8'));
    const templateHtml = fs.readFileSync('template.html', 'utf8');

    return prettier.format(
        templateHtml.replace('<div id="root" />', bodyContent),
        {
            parser: 'html',
            ...prettierConfig,
        }
    );
}
