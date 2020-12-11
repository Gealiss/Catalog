import { PriceModelErrors } from './types';
import * as AlertTypes from '../alert/types';
export function parsePriceErrors(data) {
    let error = null;
    let alerts = [];
    for (var e in PriceModelErrors) {
        error = data[e] ? data[e] : null;
        if (error != null) {
            let title = PriceModelErrors[e];
            alerts.push({ type: AlertTypes.AlertMessageTypes.error, title: title, message: error });
        }
    }
    // TODO: iterate through other defined types of response
    return alerts;
}
//# sourceMappingURL=actions.js.map