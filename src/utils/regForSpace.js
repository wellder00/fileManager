export const changeQuotes = (args) => {
  const refArg = args
    .join(" ")
    .split(/["'] | ["']/)
    .map((arg) => arg.replace(/"|'/g, ""));
  return refArg;
};
