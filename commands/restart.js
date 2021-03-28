const execa = require('execa');
const workdir = require('../utils/workdir');

module.exports = {
    command: 'restart',
    describe: 'Restart the local Ghost instance',
    builder: {},

    handler: function (args) {
        workdir.use(args);
        execa.sync('ghost', ['restart', '--development'], {
            stdio: 'inherit'
        });
    }
};