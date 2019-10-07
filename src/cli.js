#!/usr/bin/env node

const _omitBy = require('lodash/omitBy');
const _isNil = require('lodash/isNil');
const _set = require('lodash/set');

const program = require('commander');
const pkg = require('../package.json');

const toPDF = require('./index');
const { parseUnit, parseOrientation, parsePaperSize, parseNumber } = require('./cli-validation');

const options = {};
const map = (loc, parser = (v => v)) => (v) => v && _set(options, loc, parser(v));

const mapUnit = (loc) => map(loc, parseUnit);
const mapNumber = (loc) => map(loc, parseNumber);
const mapLandscape = map('landscape', v => parseOrientation(v) === 'landscape');
const mapBoolean = (loc, flagName) => () => {
    _set(options, loc, !process.argv.includes('--no-' + flagName));
};

program
    .version(pkg.version)
    .arguments('[input] [output]')

    .option('-B, --margin-bottom <unitreal>', 'Set the page bottom margin', mapUnit('margin.bottom'))
    .option('-L, --margin-left <unitreal>', 'Set the page left margin (default 10mm)', mapUnit('margin.left'))
    .option('-R, --margin-right <unitreal>', 'Set the page right margin (default 10mm)', mapUnit('margin.right'))
    .option('-T, --margin-top <unitreal>', 'Set the page top margin', mapUnit('margin.top'))

    .option('-O, --orientation <orientation>', 'Set orientation to Landscape or Portrait (default Portrait)', mapLandscape)
    .option('-s, --page-size <Size>', 'Set paper size to: A4, Letter, etc. (default A4)', map('format'))
    .option('--page-height <unitreal>', 'Page height', mapUnit('height'))
    .option('--page-width <unitreal>', 'Page width', mapUnit('width'))
    .option('--page-ranges <range>', 'Page ranges to print, e.g., "1-5, 8, 11-13" (default all)', map('pageRanges'))

    .option('--no-background, --background', 'Print background', mapBoolean('printBackground', 'background'))

    .option('--file-type <type>', 'Format', map('type'))
    .option('--image-scale <scale>', 'Scale', mapNumber('viewport.deviceScaleFactor'))
    .option('--image-height <height>', 'Height', mapNumber('viewport.height'))
    .option('--image-width <width>', 'Height', mapNumber('viewport.width'))

    .action((input, output) => {
        map('input')(input);
        map('path')(output);
    });

program.parse(process.argv);

toPDF(options);
