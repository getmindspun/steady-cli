const path = require('path');
const execa = require('execa');

const rc = require('../utils/rc');
const workdir = require('../utils/workdir');
const theme = require('../utils/theme');

module.exports = {
    command: 'develop',
    describe: 'Start the theme development process',
    builder: {},

    handler: function (args) {
        workdir.use(args);

        const themeName = rc.config.themeName || 'spin';
        theme.check(themeName);

        execa.sync('npm', ['run', 'dev'], {
            cwd: path.resolve('content', 'themes', themeName),
            stdio: 'inherit'
        });
    }
};
