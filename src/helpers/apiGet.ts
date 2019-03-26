import https from 'https';
import { getApiUrl } from '../util';
import { payloadInterface } from '../interfaces';

export default (endpoint: string, payload: payloadInterface) => {
    return new Promise((resolve, reject) => {
        let response: any = '';
        https.get(
            `${getApiUrl()}/${endpoint}
                ?api_key=${payload.api_key}
                &sig=${payload.sig}
                &format=${payload.format}
                &json=${encodeURIComponent(payload.json)}`, (resp) => {
            resp.on('data', (chunk) => {
                response += chunk;
            });
            resp.on('end', () => {
                return resolve(JSON.parse(response));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });    
}