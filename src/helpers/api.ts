import { makeApiCall } from '../util';
import { payloadInterface } from '../interfaces';

export const getCall = (endpoint: string, payload: payloadInterface): object => makeApiCall(endpoint, payload, 'GET');
export const postCall = (endpoint: string, payload: payloadInterface): object => makeApiCall(endpoint, payload, 'POST');