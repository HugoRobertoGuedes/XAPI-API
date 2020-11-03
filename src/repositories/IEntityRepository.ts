import { Entity } from "./../models/Entity";

export interface IEntityRepository {
  FindEntityFilter(filter: object): Promise<Entity[]>;
  SaveNewEntity(entity: Entity): Promise<Object>;
  EntityUpdate(id: string, filds_up: Object): Promise<Entity>;
}
