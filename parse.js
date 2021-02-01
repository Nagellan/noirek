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

    return prettier.format(
        `
    <!DOCTYPE html>
    <html lang="ru">
         <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <title>noirek</title>

            <meta name="application-name" content="noirek" />
            <meta name="author" content="Ирек Назмиев" />
            <meta
                name="description"
                content="Проект по защите Ирека в российском сегменте сети Интернет"
            />
            <meta
                name="keywords"
                content="nometa, nometa.xyz, nohello, nohello.com, neprivet, neprivet.ru, noirek, noirek.xyz, Ирек, Назмиев, Irek, Nazmiev"
            />
         </head>
    
         <body>
            ${bodyContent}
         </body>
    </html>
    `,
        { parser: 'html', ...prettierConfig }
    );
}
