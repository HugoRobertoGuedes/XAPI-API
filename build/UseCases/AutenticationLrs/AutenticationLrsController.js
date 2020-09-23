"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationLrsController = void 0;
class AutenticationLrsController {
    constructor(_autenticarLrs) {
        this._autenticarLrs = _autenticarLrs;
    }
    async handle(request, response) {
        try {
            const { user, pass, tokenExpire } = request.body;
            const ret = await this._autenticarLrs.execulte({ user, pass }, tokenExpire);
            return response.status(200).send({
                Ok: true,
                Message: `Authenticated application valid for ${tokenExpire} ms`,
                ret,
            });
        }
        catch (err) {
            console.log(err.message);
            return response.status(400).send({
                Error: err.message,
            });
        }
    }
}
exports.AutenticationLrsController = AutenticationLrsController;
