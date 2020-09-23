import { app } from "./app";
const { HOST, PORT } = require("./config");

app.listen(PORT, function () {
  console.log("Service execution => " + HOST + PORT);
});
