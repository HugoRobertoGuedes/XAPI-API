"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationAppController = void 0;
class AutenticationAppController {
    constructor(_autenticationAppService) {
        this._autenticationAppService = _autenticationAppService;
    }
    async handle(request, response) {
        const auth = request.body;
        try {
            let ip = request.clientIp ||
                request.headers["x-forwarded-for"] ||
                request.connection.remoteAddress;
            const Obj = await this._autenticationAppService.execulte(auth, ip.toString());
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
exports.AutenticationAppController = AutenticationAppController;
