import { EntityRepository } from "./../../repositories/MongoDB/EntityRepository";
import { RegistryNewEntityController } from "./RegistryNewEntityController";
import { RegistryNewEntity } from "./RegistryNewEntity.ts";

const entityRepository = new EntityRepository();

const registryNewEntity = new RegistryNewEntity(entityRepository);
const registryNewEntityController = new RegistryNewEntityController(
  registryNewEntity
);

export { registryNewEntity, registryNewEntityController };
