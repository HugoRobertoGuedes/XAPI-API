import { AppRepository } from "./../../repositories/MongoDB/AppRepository";
import { RegistryUserApp } from "./RegistryUserApp";
import { RegistryUserAppController } from "./RegistryUserAppController";

const appRepository = new AppRepository();
const registryUserApp = new RegistryUserApp(appRepository);
const registryUserAppController = new RegistryUserAppController(
  registryUserApp
);

export { registryUserApp, registryUserAppController };
