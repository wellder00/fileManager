import { moveUp, showList, moveToDir } from "../services/navigationService.js";

import {
  printFileContent,
  addFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile,
} from "../services/fileService.js";

import {
  printSystemEOL,
  showCpuInfo,
  showHomeDir,
  showUserName,
  showArchitecture,
} from "../controllers/osInfoController.js";

import { compressFile, decompressFile } from "../services/archiveService.js";

import { printFileHash } from "../controllers/hashController.js";

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
  hash: printFileHash,
  compress: compressFile,
  decompress: decompressFile,
};

export const osInfo = {
  "--eol": printSystemEOL,
  "--cpus": showCpuInfo,
  "--homedir": showHomeDir,
  "--username": showUserName,
  "--architecture": showArchitecture,
};
