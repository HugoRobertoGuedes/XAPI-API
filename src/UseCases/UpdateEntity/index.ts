import { EntityRepository } from "./../../repositories/MongoDB/EntityRepository";
import { UpdateEntity } from "./UpdateEntity";
import { UpdateEntityController } from "./UpdateEntityController";

const entityRepository = new EntityRepository();

const updateEntity = new UpdateEntity(entityRepository);
const updateEntityController = new UpdateEntityController(updateEntity);

export { updateEntity, updateEntityController };
