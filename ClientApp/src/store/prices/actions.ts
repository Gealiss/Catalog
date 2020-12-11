import { Price, PriceModelErrors } from './types';
import * as AlertTypes from '../alert/types';

export function parsePriceErrors(data: any): AlertTypes.Alert[] {
    let error = null;
    let alerts: AlertTypes.Alert[] = [];

    for (var e in PriceModelErrors) {
        error = data[e] ? data[e] : null;
        if (error != null) {
            let title = (PriceModelErrors as any)[e];
            alerts.push({ type: AlertTypes.AlertMessageTypes.error, title: title, message: error });
        }
    }
    // TODO: iterate through other defined types of response

    return alerts;
}