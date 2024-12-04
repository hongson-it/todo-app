const generateId = (number) => {
  return Math.floor(Math.random() * number) + 1;
};

export { generateId };
