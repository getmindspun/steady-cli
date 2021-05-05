const os = require('os');
const fs = require('fs');
const path = require('path');

const rimraf = require('rimraf');

const ghost = require('../../utils/ghost');

describe('ghost', () => {
    describe('latestRelease', () => {
        it('should find release', async () => {
            expect.assertions(1);
            const result = await ghost.latestRelease();
            expect(result.startsWith('v')).toBeTruthy();
        });
    });

    describe('downloadGhost', () => {
        it('should download latest version', async () => {
            expect.assertions(1);

            const tmpDir = fs.mkdtempSync(fs.realpathSync(os.tmpdir()) + path.sep);
            process.chdir(tmpDir);

            const result = await ghost.downloadGhost();
            expect(fs.existsSync(result)).toBeTruthy();

            process.chdir(__dirname);
            rimraf.sync(tmpDir);
        });
    });
});
