import crypto from 'crypto'

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

export const getApiUrl = (): string => 'https://api.sailthru.com';