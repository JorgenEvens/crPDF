function parseUnits(value) {
    if (/\d+(em|vh|px|cm|mm)/.test(value))
        return value;

    return undefined;
}

function parseOrientation(value) {
    value = value.trim().toLowerCase();

    if (value == 'landscape')
        return value;

    return 'portrait';
}

function parsePaperSize(value) {
    if (['A4', 'Letter'].includes(value))
        return value;
}

module.exports = {
    parseUnits,
    parseOrientation,
    parsePaperSize
}
