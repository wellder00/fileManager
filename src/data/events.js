import { moveUp, showList, moveToDir } from "../services/navigationService.js";
import { printFileContent, addFile } from "../services/fileService.js";

export const occurrence = {
  up: moveUp,
  ls: showList,
  cd: moveToDir,
  cat: printFileContent,
  add: addFile
};
