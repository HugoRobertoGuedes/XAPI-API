import { SearchAppController } from "./SearchAppController";
import { SearchApp } from "./SearchApp";
import { AppRepository } from "./../../repositories/MongoDB/AppRepository";

const appRepository = new AppRepository();

const searchApp = new SearchApp(appRepository);
const searchAppController = new SearchAppController(searchApp);

export { searchAppController, searchApp };
