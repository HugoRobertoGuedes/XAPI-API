"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationUserAppController = void 0;
class AutenticationUserAppController {
    constructor(_autenticationUserAppService) {
        this._autenticationUserAppService = _autenticationUserAppService;
    }
    async handle(request, response) {
        const { user, pass, tokenApp } = request.body;
        try {
            let ip = request.clientIp ||
                request.headers["x-forwarded-for"] ||
                request.connection.remoteAddress;
            const Obj = await this._autenticationUserAppService.execulte({ user, pass }, tokenApp, ip.toString());
            return response.status(200).send({
                Ok: true,
                Message: "Authenticated application valid for 2 hours",
                Obj,
            });
        }
        catch (err) {
            return response.status(401).send({
                Message: err.message,
                Ok: false,
                Obj: {},
            });
        }
    }
}
exports.AutenticationUserAppController = AutenticationUserAppController;
