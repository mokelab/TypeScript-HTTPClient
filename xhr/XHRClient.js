var Method;
(function (Method) {
    Method[Method["GET"] = 0] = "GET";
    Method[Method["POST"] = 1] = "POST";
    Method[Method["PUT"] = 2] = "PUT";
    Method[Method["DELETE"] = 3] = "DELETE";
})(Method || (Method = {}));
class HTTPResponse {
    constructor(status, body) {
        this.status = status;
        this.body = body;
    }
}
///<reference path="../HTTPClient.ts"/>
class XHRClient {
    constructor(respType) {
        if (respType === undefined) {
            this.respType = 'json';
        }
        else {
            this.respType = respType;
        }
    }
    send(method, url, header, body) {
        if (header == null) {
            throw 'header must not be null';
        }
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open(this.toMethodStr(method), url, true);
            xhr.responseType = this.respType;
            for (var key in header) {
                xhr.setRequestHeader(key, header[key]);
            }
            xhr.onload = function () {
                resolve(new HTTPResponse(this.status, this.response));
            };
            xhr.onerror = (e) => {
                reject(e);
            };
            if (body == null) {
                xhr.send();
            }
            else {
                xhr.send(body);
            }
        });
    }
    toMethodStr(method) {
        switch (method) {
            case Method.GET: return 'GET';
            case Method.POST: return 'POST';
            case Method.PUT: return 'PUT';
            case Method.DELETE: return 'DELETE';
            default: return 'GET';
        }
    }
}
