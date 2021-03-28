jest.mock('execa');

describe('restart', () => {
    it('should restart', () => {
        expect.assertions(4);
        const restart = require('commands/restart');
        expect(restart.command).toBe('restart');
        expect(restart.describe).toBeTruthy();
        expect(restart.builder).toStrictEqual({});
        expect(restart.handler({})).toBeUndefined();
    });

    it('should start with workdir from argv', () => {
        expect.assertions(1);
        const restart = require('commands/restart');
        expect(restart.handler({workdir: '.'})).toBeUndefined();
    });

    it('should restart with workdir from rc', () => {
        expect.assertions(1);
        const rc = require('utils/rc');
        rc.config = {workDir: '.'};

        const restart = require('commands/restart');
        expect(restart.handler({})).toBeUndefined();
    });
});
