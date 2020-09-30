import { SearchAllUserAppsAppController } from "./SearchAllUserAppsController";
import { SearchAllUserApps } from "./SearchAllUserApps";
import { AppRepository } from "../../repositories/MongoDB/AppRepository";

const appRepository = new AppRepository();

const searcAllUserhApp = new SearchAllUserApps(appRepository);
const searchAllUserAppController = new SearchAllUserAppsAppController(searcAllUserhApp);

export { searcAllUserhApp, searchAllUserAppController };
