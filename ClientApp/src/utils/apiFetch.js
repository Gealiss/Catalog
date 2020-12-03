var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function Get(url = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                //'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        let res = { isOk: response.ok, status: response.status, url: response.url };
        return res;
    });
}
export function Post(url = '', data = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // Default options are marked with *
        const response = yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        let parsedData = {};
        try {
            parsedData = yield response.json(); // parses JSON response into native JavaScript objects
        }
        catch (e) { }
        let res = { isOk: response.ok, status: response.status, data: parsedData };
        return res;
    });
}
//# sourceMappingURL=apiFetch.js.map