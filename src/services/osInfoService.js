import { cpus } from "os";

export const getCpuInfo = () => {
  return cpus().map(({ model, speed }) => ({
    model,
    speed: `${(speed / 1000).toFixed(2)}GHz`,
  }));
};