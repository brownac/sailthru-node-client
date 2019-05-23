import crypto from 'crypto'
import https from 'https';
import { payloadInterface } from './interfaces';

export const getSignatureHash = (params: object, secret: string) => md5(getSignatureString(params, secret));

export const getSignatureString = (params: object, secret: string): string => secret + extractParamValues(params).sort().join('');

export const md5 = (data: string) => {
    let md5: any;
    md5 = crypto.createHash('md5');
    md5.update(data, 'utf8');
    return md5.digest('hex');
};

export const extractParamValues = (params: any) => {
    let k: string, temp: any, v: any, values: any;
    values = [];
    for (k in params) {
        v = params[k];
        if (v instanceof Array) {
            temp = extractParamValues(v);
            values = values.concat(temp);
        } else if (typeof v === 'string' || typeof v === 'number') {
            values.push(v);
        } else if (typeof v === 'boolean') {
            values.push(v = v === true ? 1 : 0);
        } else {
            values = values.concat(extractParamValues(v));
        }
    }
    return values;
};

export const getApiUrl = (): string => 'api.sailthru.com';

export const makeApiCall = (endpoint: string, payload: payloadInterface, method: string): Promise<object> => {
    const options = {
        hostname: getApiUrl(),
        path: `/${endpoint}?api_key=${payload.api_key}&sig=${payload.sig}&format=${payload.format}&json=${encodeURIComponent(payload.json)}`,
        method,
    };
    return new Promise((resolve, reject) => {
        let response: any = '';
        const req = https.request(options, (resp) => {
            resp.on('data', (chunk) => {
                response += chunk;
            });
            resp.on('end', () => {
                return resolve(JSON.parse(response));
            });
        }).on('error', (e) => {
            reject('Error during request: ' + e);
        });
        req.end();
    });    
};