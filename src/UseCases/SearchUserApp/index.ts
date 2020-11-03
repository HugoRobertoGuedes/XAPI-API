import { SearchUserAppController } from "./SearchUserAppController";
import { SearchUserApp } from "./../SearchUserApp/SearchUserApp";
import { AppRepository } from "./../../repositories/MongoDB/AppRepository";

const appRepository = new AppRepository();

const searchUserApp = new SearchUserApp(appRepository);
const searchUserAppController = new SearchUserAppController(searchUserApp);

export { searchUserApp, searchUserAppController };
