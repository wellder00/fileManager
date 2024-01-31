export const getArguments = () => {
  const args = process.argv.slice(2);
  return args;
};


export const getNameUser = () => {
  const args = process.argv.slice(2);
  return args[1].split('=')[1];
};