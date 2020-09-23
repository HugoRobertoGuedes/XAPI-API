"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const { HOST, PORT } = require("./config");
app_1.app.listen(PORT, function () {
    console.log("Service execution => " + HOST + PORT);
});
