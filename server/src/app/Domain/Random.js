export const getRandomNumber = (length) => {
  let value = "";
  // const element = Math.random() * 100000000000000000000;

  for (let i = 0; i < length; i++) {
    const element = Math.floor(Math.random() * 10);

    value += element;
  }

  return value;
};
