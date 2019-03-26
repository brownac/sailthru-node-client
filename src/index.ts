import { getSignatureHash } from './util';
import { payloadInterface } from './interfaces';
import getCall from './helpers/apiGet';

class SailthruClient {
    key: string;
    secret: string;
    
    constructor(apiKey: string, apiSecret: string) {
        this.key = apiKey;
        this.secret = apiSecret;
    }

    _preparePayload(data: object): payloadInterface {
        const obj: payloadInterface = {
            api_key: this.key,
            format: 'json', 
            json: JSON.stringify(data),
        };
        const payload: payloadInterface = Object.assign(obj, {
            sig: getSignatureHash(obj, this.secret),
        });
        return payload;
    }
    
    log(message: string) {
        console.log(message);
    }

    async apiGet(endpoint: string, data: object) {
        const payload: payloadInterface = this._preparePayload(data);
        return getCall(endpoint, payload);
    }
}

export default SailthruClient;