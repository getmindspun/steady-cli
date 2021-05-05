const axios = require('axios');
const download = require('download');

const GITHUB_REPOS_URL = 'https://api.github.com/repos/getmindspun/ghost';
const GITHUB_DOWNLOAD_URL = 'https://github.com/getmindspun/ghost/releases/download';

async function latestRelease() {
    const res = await axios.get(`${ GITHUB_REPOS_URL }/releases?per_page=1`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    });
    return res.data[0].tag_name;
}

async function downloadGhost() {
    let release = await latestRelease(); // e.g. v4.3.3-1
    release = release.substring(1);

    const uri = `${ GITHUB_DOWNLOAD_URL }/v${ release }/Ghost-${ release }.zip`;

    await download(uri, '.dist');
    return `.dist/Ghost-${ release }.zip`;
}

module.exports = {
    latestRelease,
    downloadGhost
};