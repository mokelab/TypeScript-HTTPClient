var Method;
(function (Method) {
    Method[Method["GET"] = 0] = "GET";
    Method[Method["POST"] = 1] = "POST";
    Method[Method["PUT"] = 2] = "PUT";
    Method[Method["DELETE"] = 3] = "DELETE";
})(Method || (Method = {}));
var HTTPResponse = (function () {
    function HTTPResponse(status, body) {
        this.status = status;
        this.body = body;
    }
    return HTTPResponse;
}());
///<reference path="../HTTPClient.ts"/>
///<reference path="./es6-promise.d.ts"/>
var http = require('https');
var url = require("url");
var NodeHTTPsClient = (function () {
    function NodeHTTPsClient() {
    }
    NodeHTTPsClient.prototype.send = function (method, url_, header, body) {
        var _this = this;
        if (header == null) {
            throw 'header must not be null';
        }
        return new Promise(function (resolve, reject) {
            var u = url.parse(url_);
            var options = {
                hostname: u.hostname,
                port: u.port,
                path: u.pathname,
                method: _this.toMethodStr(method),
                headers: header
            };
            var request = http.request(options, function (response) {
                var status = response.statusCode;
                var respBody = '';
                response.on('data', function (chunk) {
                    respBody += chunk;
                });
                response.on('end', function () {
                    resolve(new HTTPResponse(status, respBody));
                });
            });
            if (body != null) {
                request.write(body);
            }
            request.end();
        });
    };
    NodeHTTPsClient.prototype.toMethodStr = function (method) {
        switch (method) {
            case Method.GET: return 'GET';
            case Method.POST: return 'POST';
            case Method.PUT: return 'PUT';
            case Method.DELETE: return 'DELETE';
            default: return 'GET';
        }
    };
    return NodeHTTPsClient;
}());
exports.Client = NodeHTTPsClient;
exports.Method = Method;
