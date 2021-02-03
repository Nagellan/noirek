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

            <link rel="stylesheet" href="github-md.css" />
            <link rel="stylesheet" href="styles.css" />
         </head>
    
         <body>
            <article>
                ${bodyContent}
            </article>

            <footer>
                <div class="row">
                    Пародия на
                    <a href="http://neprivet.ru">neprivet.ru</a> (автор Андрей Самсонов), код на
                    <a href="https://github.com/kryzhovnik/neprivet">
                        Гитхабе
                        <svg
                            aria-hidden="true"
                            id="octicon-icon"
                            height="24"
                            version="1.1"
                            viewBox="0 0 16 16"
                            width="24"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                            ></path>
                        </svg>
                    </a>
                </div>
            </footer>
         </body>
    </html>
    `,
        { parser: 'html', ...prettierConfig }
    );
}
