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
            const result = await this._autenticationAppService.execulte(auth);
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
exports.AutenticationAppController = AutenticationAppController;
