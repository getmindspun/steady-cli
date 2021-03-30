describe('load-asset', () => {
    it('should load', () => {
        expect.assertions(2);
        const loadAsset = require('utils/load-asset.js');

        const result = loadAsset('ghostdb.sql');
        expect(result).toBeTruthy();
        expect(typeof result).toStrictEqual('string');
    });
});
