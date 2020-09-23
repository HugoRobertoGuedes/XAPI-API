"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryNewStatementController = void 0;
const String_1 = require("../../helpers/String");
class RegistryNewStatementController {
    constructor(_registryNewStatement) {
        this._registryNewStatement = _registryNewStatement;
    }
    async handler(request, response) {
        const state = request.body;
        const token = String_1.BearerTokenHeader(request.headers["authorization"]);
        try {
            const insertedState = await this._registryNewStatement.execulte(state, token);
            return response.status(200).send({
                Message: "Succes Register Statement",
                Ok: true,
                obj: insertedState,
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
exports.RegistryNewStatementController = RegistryNewStatementController;
