import { moveUp, showList, moveToDir } from "../services/navigationService.js";
import {
  printFileContent,
  addFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile,
} from "../services/fileService.js";

export const occurrence = {
  up: moveUp,
  ls: showList,
  cd: moveToDir,
  cat: printFileContent,
  add: addFile,
  rn: renameFile,
  cp: copyFile,
  mv: moveFile,
  rm: removeFile,
};
