import { EntityRepository } from "./../../repositories/MongoDB/EntityRepository";
import { SearchEntityCOntroller } from "./SearchEntityController";
import { SearchEntity } from "./SearchEntity";

const entityRepository = new EntityRepository();

const searchEntity = new SearchEntity(entityRepository);
const searchEntityController = new SearchEntityCOntroller(searchEntity);

export { searchEntity, searchEntityController };
