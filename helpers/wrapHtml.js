const fs = require('fs');
const prettier = require('prettier');
const prettierConfig = require('../.prettierrc');

const template = fs.readFileSync('helpers/template.html', 'utf8');

module.exports = (body, { wrapper = template, config = prettierConfig } = {}) =>
    prettier.format(wrapper.replace('<div id="root" />', body), {
        parser: 'html',
        ...config,
    });
