const fs = require('fs');
const path = require('path');

const download = require('download');
const decompress = require('decompress');
const execa = require('execa');

const Database = require('better-sqlite3');

const loadAsset = require('../utils/load-asset');
const initrc = require('../commands/initrc');
const dirIsEmpty = require('../utils/dir-is-empty');
const walk = require('../utils/walk');
const workdir = require('../utils/workdir');
const ghost = require('../utils/ghost');

const THEME_URL = 'https://github.com/getmindspun/spin/archive/deploy.zip';

module.exports = {
    command: 'setup',
    describe: 'Setup a development environment in the current directory',
    builder: {},

    handler: async function (args) {
        if (args.workdir) {
            workdir.check(args.workdir);
            process.chdir(args.workdir);
        }

        if (!dirIsEmpty(process.cwd())) {
            return Promise.reject(new Error('Current directory is not empty, setup cannot continue.'));
        }

        const ghostZipPath = await ghost.downloadGhost();

        console.log('Installing Ghost ...');
        execa.sync('ghost', [
            'install', 'local', '--zip', ghostZipPath
        ], {stdio: 'inherit'});

        console.log('Stopping Ghost ...');
        execa.sync('ghost', ['stop']);

        console.log('Fixing file permissions on Ghost installation ...');
        for await (const path of walk('current')) {
            fs.chmodSync(path, 0o644);
        }

        console.log('Initializing Ghost database ...');
        const ghostDbPath = path.resolve(process.cwd(), 'content', 'data', 'ghost-local.db');
        const db = new Database(ghostDbPath);
        db.exec(loadAsset('ghostdb.sql'));
        db.close();

        console.log('Downloading spin theme ...');
        await download(THEME_URL, '.dist', {
            filename: 'theme.zip'
        });

        console.log('Decompressing theme ...');
        await decompress(
            path.resolve('.dist', 'theme.zip'),
            path.resolve('content', 'themes')
        );
        fs.renameSync(
            path.resolve('content', 'themes', 'spin-deploy'),
            path.resolve('content', 'themes', 'spin')
        );

        console.log('Installing theme dependencies ...');
        execa.sync('npm', ['install'], {
            cwd: path.resolve('content', 'themes', 'spin'),
            stdio: 'inherit'
        });

        console.log('Building spin theme ...');
        execa.sync('npm', ['run', 'build'], {
            cwd: path.resolve('content', 'themes', 'spin'),
            stdio: 'inherit'
        });

        console.log('Installing routes.yaml ..');
        fs.mkdirSync(path.resolve('content', 'settings'), {
            recursive: true
        });
        fs.writeFileSync(
            path.resolve('content', 'settings', 'routes.yaml'),
            loadAsset('routes.yaml')
        );

        console.log('Restarting Ghost ...');
        execa.sync('ghost', ['start']);

        fs.writeFileSync('.nvmrc', process.version);
        initrc.handler(args);

        console.log('SUCCESS!');
    }
};
