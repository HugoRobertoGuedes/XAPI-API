import { LrsRepository } from "../../repositories/MongoDB/LrsRepository";
import { UpdateUserLrs } from "./UpdateUserLrs";
import { UpdateUserLrsController } from "./UpdateUserLrsController";


const lrsRepository = new LrsRepository();
const updateUserLrs = new UpdateUserLrs(lrsRepository);

const updateUserLrsController = new UpdateUserLrsController(updateUserLrs);

export {updateUserLrs,updateUserLrsController}