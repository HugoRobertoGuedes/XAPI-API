import { EntityRepository } from "./../../repositories/MongoDB/EntityRepository";
import { AppRepository } from "./../../repositories/MongoDB/AppRepository";
import { RegistryNewAppController } from "./RegistryNewAppController";
import { RegistryNewApp } from "./RegistryNewApp";

const appRepository = new AppRepository();
const entityRepository = new EntityRepository();

const registryNewApp = new RegistryNewApp(entityRepository, appRepository);
const registryNewAppController = new RegistryNewAppController(registryNewApp);

export { registryNewApp, registryNewAppController };
