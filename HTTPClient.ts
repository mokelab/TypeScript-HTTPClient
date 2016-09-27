interface HTTPClient {
    send(method : Method, url : string, header : any, body : any) : Promise<HTTPResponse>;
}

enum Method {
    GET,
    POST,
    PUT,
    DELETE,
}

class HTTPResponse {
    status : number;
    body : any;
    constructor(status : number, body : any) {
        this.status = status;
        this.body = body;
    }
}