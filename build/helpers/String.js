"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerTokenHeader = void 0;
const BearerTokenHeader = (token) => {
    return token.replace("Bearer", "").replace(" ", "");
};
exports.BearerTokenHeader = BearerTokenHeader;
