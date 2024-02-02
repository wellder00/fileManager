export const getNameUser = () => {
  const args = process.argv.slice(2);
  const userName = args[0]?.split('=')[1]
  return userName ? userName : '';
};