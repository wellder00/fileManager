import { getNameUser } from "../utils/cliUtils.js";
import { sayGoodbye } from "../controllers/userController.js";

export const takeLeaveOf = (exit) => {
  sayGoodbye(getNameUser());
  process.nextTick(() => exit());
};
