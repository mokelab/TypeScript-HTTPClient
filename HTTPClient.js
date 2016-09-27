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
