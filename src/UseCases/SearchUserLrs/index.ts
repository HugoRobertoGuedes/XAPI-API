import { LrsRepository } from "./../../repositories/MongoDB/LrsRepository";
import {SearchUserLrs} from "./../SearchUserLrs/SearchUserLrs"
import {SearchUserLrsController} from "./SearchUserLrsController"

const lrsRepository = new LrsRepository();

const searchUserLrs = new SearchUserLrs(lrsRepository);
const searchUserLrsController = new SearchUserLrsController(searchUserLrs);

export {searchUserLrs,searchUserLrsController};

