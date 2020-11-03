import { EntityRepository } from './../../repositories/MongoDB/EntityRepository';
import { RegistryNewUserLrsController } from "./RegistryNewUserLrsController";
import { RegistryNewUserLrs } from "./RegistryNewUserLrs";
import { LrsRepository } from "./../../repositories/MongoDB/LrsRepository";

const lrsRepository = new LrsRepository();
const entityRepository = new EntityRepository();

const registryNewUserLrs = new RegistryNewUserLrs(lrsRepository, entityRepository);

const registryNewUserLrsController = new RegistryNewUserLrsController(
  registryNewUserLrs
);

export { registryNewUserLrs, registryNewUserLrsController };
