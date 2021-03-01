"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerTokenHeader = exports.CpfRegex = exports.EmailRegex = void 0;
// Regex
exports.EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.CpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
// Functions
const BearerTokenHeader = (token) => {
    return token.replace("Bearer", "").replace(" ", "");
};
exports.BearerTokenHeader = BearerTokenHeader;
