import { AppRepository } from "../../repositories/MongoDB/AppRepository";
import { UpdateApp } from "./UpdateApp";
import { UpdateAppController } from "./UpdateAppController";



const appRepository = new AppRepository();

const updateApp = new UpdateApp(appRepository);
const updateAppController = new UpdateAppController(updateApp);

export {updateApp,updateAppController};

