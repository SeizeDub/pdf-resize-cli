#!/usr/bin/env node

const PDFLib = require('pdf-lib');
const fs = require('fs');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'src', type: String, defaultOption: true },
    { name: 'width', alias: 'w', type: Number },
    { name: 'height', alias: 'h', type: Number },
    { name: 'unit', alias: 'u', type: String}
];
const options = commandLineArgs(optionDefinitions);

main(options);

async function main(options) {
    if (!options.width && !options.height) {
        console.log('At least one dimension must be set.');
        process.exit();
    }

    console.log('working...');

    const file = fs.readFileSync(options.src);
    const PDFDocument = await PDFLib.PDFDocument.load(file);
    const pages = PDFDocument.getPages();

    const {width: currentWidthInPoints, height: currentHeightInPoints} = pages[0].getSize();

    const unitMultiplicator = getUnitMultiplicator(options.unit);

    const targetWidthInPoints = (options.width * unitMultiplicator) || null;
    const targetHeightInPoints = (options.height * unitMultiplicator) || null;
    
    const ratioWidth = (targetWidthInPoints / currentWidthInPoints) || null;
    const ratioHeight = (targetHeightInPoints / currentHeightInPoints) || null;

    pages.forEach(page => {
        page.scale(ratioWidth || ratioHeight, ratioHeight || ratioWidth);
    })
    
    let PDFOutput = await PDFDocument.save();
    fs.writeFileSync(options.src, PDFOutput);
    console.log('done');
}

function getUnitMultiplicator(unit = 'cm') {
    if (['inch', 'in'].includes(unit)) {
        // Points per inch (default PDF coordinate system) : 72
        return 72;
    }
    if (['centimeter', 'cm'].includes(unit)) {
        // Centimeters per inch : 2.54
        return 72 / 2.54
    }
    console.log('Unknown unit');
    process.exit();
}