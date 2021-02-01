"use strict";

const fs = require("fs");

const filePath = process.argv[2];

if (!filePath) {
  throw new Error("You have to specify a path to .md-file!");
}

const fileContent = fs.readFileSync(filePath, "utf8");

console.log(fileContent);
