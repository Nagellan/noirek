const fs = require('fs');

exports.isRealDirectory = (path) => fs.lstatSync(path).isDirectory();

exports.hasExtension = (path) =>
    path.split('/').splice(-1, 1)[0].indexOf('.') === -1;

exports.getFileName = (filePath) =>
    filePath.split('/').splice(-1, 1)[0].split('.').splice(-2, 1)[0];
