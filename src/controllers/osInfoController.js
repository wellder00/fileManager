import { EOL, userInfo } from "os";
import { consoleColors } from "../config/constants.js";
import { getCpuInfo } from "../services/osInfoService.js";

export const printSystemEOL = () => {
  console.log(consoleColors.green, `System End-Of-Line (EOL): ${JSON.stringify(EOL)}`);
};

export const showUserName = () => console.log(consoleColors.green, userInfo().username);
export const showHomeDir = () => console.log(consoleColors.green, userInfo().homedir);
export const showArchitecture = () => console.log(consoleColors.green, process.arch);

export const showCpuInfo = () => {
  const cpuInfo = getCpuInfo();
  const totalCpus = cpuInfo.length;

  console.log(consoleColors.green, `Total CPUs: ${totalCpus}`);
  console.log(consoleColors.green, "CPU Information:");
  console.table(cpuInfo);
};
