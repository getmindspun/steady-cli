jest.mock('execa');

describe('start', () => {
    it('should start', () => {
        expect.assertions(4);
        const start = require('commands/start');
        expect(start.command).toBe('start');
        expect(start.describe).toBeTruthy();
        expect(start.builder).toStrictEqual({});
        expect(start.handler({})).toBeUndefined();
    });

    it('should start with workdir from argv', () => {
        expect.assertions(1);
        const start = require('commands/start');
        expect(start.handler({workdir: '.'})).toBeUndefined();
    });

    it('should start with workdir from rc', () => {
        expect.assertions(1);
        const rc = require('utils/rc');
        rc.config = {workDir: '.'};

        const start = require('commands/start');
        expect(start.handler({})).toBeUndefined();
    });
});
