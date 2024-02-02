import { moveUp, showList, moveToDir } from "../services/navigationService.js";

export const occurrence = {
  up: moveUp,
  ls: showList,
  cd: moveToDir,
};
