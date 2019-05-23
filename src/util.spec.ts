import {
    getSignatureHash,
    getSignatureString,
    md5,
    getApiUrl,
    extractParamValues,
    makeApiCall,
} from './util';

jest.mock('crypto', () => ({
    createHash: jest.fn(() => ({
        update: jest.fn(),
        digest: jest.fn(() => 'digest'),
    })),
}));

jest.mock('https', () => ({
    request: jest.fn(() => ({
        on: jest.fn(event => console.log(event)),
    })),
}));

describe('util', () => {
    test('getSignatureHash', () => {
        expect(getSignatureHash({}, 'secret')).toEqual('digest');
    });
    test('getSignatureString', () => {
        const signatureString = getSignatureString(
            {
                api_key: '123key',
                format: 'json',
                json: JSON.stringify({key: 'value'})
            },
            'secret',
        );
        expect(signatureString).toEqual('secret123keyjson{"key":"value"}');
    });
    test('md5', () => {
        expect(md5('test')).toEqual('digest');
    });
    test('extractParamValues', () => {
       const values = extractParamValues({
           api_key: '123key',
           format: 'json',
           json: JSON.stringify({key: 'value'}),
       });
       expect(values).toEqual(['123key', 'json', JSON.stringify({ key: 'value' })]);
    });
    test('getApiUrl', () => {
        expect(getApiUrl()).toEqual('api.sailthru.com');
    });
    test('makeApiCall', async () => {
        const res = await makeApiCall('test', {}, 'GET');
        console.log(res);
    });
});