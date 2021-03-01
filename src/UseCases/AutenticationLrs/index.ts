import { RedisService } from "../../services/RedisService";
import { AuthRepository } from "../../repositories/MongoDB/AuthRepository";
import { AutenticationLrs } from "./AutenticationLrs";
import { AutenticationLrsController } from "./AutenticationLrsController";

import { redisCli } from "../../app";

const redisService = new RedisService(redisCli);
const mongoAuthRepository = new AuthRepository();

const autenticationLrs = new AutenticationLrs(
  mongoAuthRepository,
  redisService
);

const autenticationLrsController = new AutenticationLrsController(
  autenticationLrs
);

export { autenticationLrs, autenticationLrsController };
