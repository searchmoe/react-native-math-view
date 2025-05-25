﻿const child_process = require('child_process');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');


const mathjaxEntry = require.resolve('mathjax-full');
const mathjaxDir = mathjaxEntry.substring(0, mathjaxEntry.indexOf('mathjax-full') + 'mathjax-full'.length);

const dir = path.resolve(__dirname, '..');
const cwd = dir.substring(0, dir.indexOf('node_modules'));  // dir.includes('node_modules') ? path.resolve(dir, '..', '..') : dir

const processConfig = {
    stdio: 'inherit',
    cwd: mathjaxDir,
    //detached: true
};



try {
    //  compiles ts files
    console.log(chalk.bold('compiling mathjax'));
    child_process.execSync('npm run compile', processConfig);
}
catch (e) { };

child_process.execSync('npm run postcompile', processConfig);

const innerPathToFile = 'input/tex/mhchem/mhchemparser/mhchemParser.js';
const innerPathToDir = 'input/tex/mhchem/mhchemparser';
fs.ensureDirSync(path.resolve(processConfig.cwd, 'js', innerPathToDir));
fs.copyFileSync(path.resolve(cwd, 'node_modules/mhchemparser/dist/mhchemParser.js'), path.resolve(processConfig.cwd, 'js', innerPathToFile));

console.log(chalk.bold('\n\n\nreact-native-math-view:'));
console.log(chalk.bold('compiled mathjax successfully'));
console.log(chalk.bold('typescript compiling errors can be safely disregarded'));