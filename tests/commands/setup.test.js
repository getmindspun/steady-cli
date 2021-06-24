const os = require('os');
const path = require('path');
const fs = require('fs-extra');

jest.mock('execa');
jest.mock('decompress');
jest.mock('../../utils/load-asset', () => () => '');

describe('setup', () => {
    it('should initialize directory', async () => {
        expect.assertions(3);

        const setup = require('commands/setup');
        expect(setup.command).toBe('setup');
        expect(setup.describe).toBeTruthy();
        expect(setup.builder).toStrictEqual({});

        // await setup.handler({workdir: tmpDir});
    });

    it('should complain directory is not empty', async () => {
        expect.assertions(1);
        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        process.chdir(tmpDir);
        fs.writeFileSync(`${ tmpDir + path.sep }README`, '');

        const setup = require('commands/setup');

        await expect(setup.handler({})).rejects.toStrictEqual(
            Error('Current directory is not empty, setup cannot continue.')
        );
        process.chdir(__dirname);
        fs.removeSync(tmpDir);
    });
});
