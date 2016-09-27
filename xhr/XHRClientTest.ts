///<reference path="./XHRClient.ts"/>

declare function describe(label : string, body : any);
declare function it(label : string, body : any);

describe('XHRClientTest', () => {
    it('GET', (done : (err? : any) => void) => {
        var c = new XHRClient();
        c.send(Method.GET, 'https://gae-echoserver.appspot.com/test', {}, null)
            .then((resp : HTTPResponse) => {
                if (resp.body.method != 'GET') {
                    done(new Error('method is not GET : ' + resp.body.method));
                    return;
                }
                if (resp.body.url != '/test') {
                    done(new Error('url is not /test : ' + resp.body.url));
                    return;
                }
                done();
            }).catch((e : any) => {
                done(new Error(e));
            });
    });

    it('GET-Header', (done : (err? : any) => void) => {
        var c = new XHRClient();
        var header = {
            'x-appid' : 'test',
        };
        c.send(Method.GET, 'https://gae-echoserver.appspot.com/test', header, null)
            .then((resp : HTTPResponse) => {
                if (resp.body.method != 'GET') {
                    done(new Error('method is not GET : ' + resp.body.method));
                    return;
                }
                if (resp.body.url != '/test') {
                    done(new Error('url is not /test : ' + resp.body.url));
                    return;
                }
                if (resp.body.header == null) {
                    done(new Error('request header is null'));
                    return;
                }
                if (resp.body.header['X-Appid'] != 'test') {
                    done(new Error('Wrong X-Appid : ' + resp.body.header['X-Appid']));
                    return;
                }
                done();
            }).catch((e : any) => {
                done(new Error(e));
            });
    });

    it('POST', (done : (err? : any) => void) => {
        var c = new XHRClient();
        var body = {
            'name' : 'moke',
            'age' : 2,
        };
        c.send(Method.POST, 'https://gae-echoserver.appspot.com/users', {}, JSON.stringify(body))
            .then((resp : HTTPResponse) => {
                if (resp.body.method != 'POST') {
                    done(new Error('method is not POST : ' + resp.body.method));
                    return;
                }
                if (resp.body.url != '/users') {
                    done(new Error('url is not /users : ' + resp.body.url));
                    return;
                }
                var req = JSON.parse(resp.body.body);
                if (req.name != 'moke') {
                    done(new Error('wrong request params'));
                    return;
                }
                done();
            }).catch((e : any) => {
                done(new Error(e));
            });
    });

    it('PUT', (done : (err? : any) => void) => {
        var c = new XHRClient();
        var body = {
            'name' : 'moke',
            'age' : 2,
        };
        c.send(Method.PUT, 'https://gae-echoserver.appspot.com/users', {}, JSON.stringify(body))
            .then((resp : HTTPResponse) => {
                if (resp.body.method != 'PUT') {
                    done(new Error('method is not PUT : ' + resp.body.method));
                    return;
                }
                if (resp.body.url != '/users') {
                    done(new Error('url is not /users : ' + resp.body.url));
                    return;
                }
                var req = JSON.parse(resp.body.body);
                if (req.age != 2) {
                    done(new Error('wrong request body'));
                    return;
                }
                done();
            }).catch((e : any) => {
                done(new Error(e));
            });
    });

    it('DELETE', (done : (err? : any) => void) => {
        var c = new XHRClient();
        c.send(Method.DELETE, 'https://gae-echoserver.appspot.com/objects', {}, null)
            .then((resp : HTTPResponse) => {
                if (resp.body.method != 'DELETE') {
                    done(new Error('method is not DELETE : ' + resp.body.method));
                    return;
                }
                if (resp.body.url != '/objects') {
                    done(new Error('url is not /objects : ' + resp.body.url));
                    return;
                }
                done();
            }).catch((e : any) => {
                done(new Error(e));
            });
    });
});