const dummyMonth = [
  [  ,   ,  1,  2,  3,  4,  5],
  [ 6,  7,  8,  9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31,   ,   ]
];

const createMonthMatrix = (offset = 0, length = 31) => {
  const padding = (offset + length) % 7 + 7;
  const upperBound = offset + length + padding;

  const month = [];
  let week = [];

  for (let i = 1; i < upperBound; i += 1) {

    const number = i - offset;
    const whatPush = (number <= 0 || number > length) ? undefined : number;
    
    week.push(whatPush);

    if ((i % 7) === 0) {
      month.push(week);

      week = [];
    }
  };
  
  return month;
};

export default createMonthMatrix;
