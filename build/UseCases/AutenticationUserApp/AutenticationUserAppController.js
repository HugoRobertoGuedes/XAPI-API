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
            const result = await this._autenticationUserAppService.execulte({ user, pass }, tokenApp);
            return response.status(200).send({
                Ok: true,
                Message: "Authenticated application valid for 2 hours",
                result,
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
exports.AutenticationUserAppController = AutenticationUserAppController;
