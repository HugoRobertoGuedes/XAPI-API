"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryNewStatement = void 0;
class RegistryNewStatement {
    constructor(_stateRepository, _redisService) {
        this._stateRepository = _stateRepository;
        this._redisService = _redisService;
    }
    async execulte(state, token) {
        // Cache redis
        let _KeyRedis = await this._redisService.GetValueToken(token);
        // Valid Statement
        await this.ValidStatement(state);
        // Create Object for registry
        let newStatement = state;
        // Insert new fields
        newStatement["Dt_Create"] = new Date();
        newStatement["App_Id"] = _KeyRedis["tokenApp"];
        // Insert Registry in database
        const insertedStatement = await this._stateRepository.InsertNewStatement(_KeyRedis["dbName"], newStatement);
        // return
        return insertedStatement;
    }
    async ValidStatement(state) {
        // Objetos Obrigatórios
        if (state.actor == null) {
            throw new Error("The object {actor} cannot be empty.");
        }
        if (state.verb == null) {
            throw new Error("The object {verb} cannot be empty.");
        }
        if (state.object == null) {
            throw new Error("The object {object} cannot be empty.");
        }
        // Propiedades obrigatórias
        if (state.actor.name == "" || state.actor.name == null) {
            throw new Error("Property {actor.name} cannot be empty");
        }
        if (state.actor.mbox == "" || state.actor.mbox == null) {
            throw new Error("Property {actor.mobox} cannot be empty");
        }
        if (state.verb.id == "" || state.verb.id == null) {
            throw new Error("Property {verb.id} cannot be empty");
        }
        if (state.verb.display["pt-BR"] == "" ||
            state.verb.display["pt-BR"] == null) {
            throw new Error("Property {verb.display}{pt-BR} cannot be empty");
        }
        if (state.object.id == "" || state.object.id == null) {
            throw new Error("Property {object.id} cannot be empty");
        }
        if (state.object.definition.name["pt-BR"] == "" ||
            state.object.definition.name["pt-BR"] == null) {
            throw new Error("Property {object: {definition: {name: 'pt-BR'}}} cannot be empty");
        }
    }
}
exports.RegistryNewStatement = RegistryNewStatement;
