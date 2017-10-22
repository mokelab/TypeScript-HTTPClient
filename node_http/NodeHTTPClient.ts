///<reference path="../HTTPClient.ts"/>
///<reference path="./es6-promise.d.ts"/>

declare function require(name : string);
declare var exports;

var http = require('http');
var url = require("url");

class NodeHTTPClient implements HTTPClient {
    send(method : Method, url_ : string, header : any, body : any) : Promise<HTTPResponse> {
        if (header == null) {
            throw 'header must not be null';
        }
        return new Promise<HTTPResponse>((resolve : (HTTPResponse) => void, reject : (any) => void) => {
            var u = url.parse(url_);
            var options = {
                hostname : u.hostname,
                port : u.port,
                path : u.pathname,
                method : this.toMethodStr(method),
                headers : header,
            };
            var request = http.request(options, (response) => {
                var status = response.statusCode;
                var respBody = '';
                response.on('data', (chunk : string) => {
                    respBody += chunk;
                });
                response.on('end', () => {
                    resolve(new HTTPResponse(status, respBody));
                });
            });
            if (body != null) {
                request.write(body);
            }
            request.end();
        });
    }

    private toMethodStr(method : Method) : string {
        switch (method) {
        case Method.GET: return 'GET';
        case Method.POST: return 'POST';
        case Method.PUT: return 'PUT';
        case Method.DELETE: return 'DELETE';
        default: return 'GET';
        }
    }
}

exports.Client = NodeHTTPClient;
exports.Method = Method;