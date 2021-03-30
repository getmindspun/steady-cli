const fs = require('fs');
const path = require('path');

const ASSET_PATH = path.resolve(__dirname, '..', 'assets');

module.exports = function (name) {
    const assetPath = path.resolve(ASSET_PATH, name);
    return fs.readFileSync(assetPath, {encoding: 'utf8', flag: 'r'});
};
