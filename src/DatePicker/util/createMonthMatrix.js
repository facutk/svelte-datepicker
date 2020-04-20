import dayjs from 'dayjs';

const dummyMonth = [
  [  ,   ,  1,  2,  3,  4,  5],
  [ 6,  7,  8,  9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31,   ,   ]
];

const createMonthMatrix = (year, month) => {
  const date = dayjs(`${year}-${month}`);
  const firstDay = date.get('day');
  const daysInMonth = date.daysInMonth();

  // const padding = (firstDay + daysInMonth) % 7 + 7;
  const upperBound = 7 * 7; // firstDay + daysInMonth + padding;

  const calendarMonth = [];

  let week = [];
  for (let i = 1; i < upperBound; i += 1) {
    const number = i - firstDay;
    const whatPush = (number <= 0 || number > daysInMonth) ? undefined : number;
    
    week.push(whatPush);

    if ((i % 7) === 0) {
      calendarMonth.push(week);

      week = [];
    }
  };
  
  return calendarMonth;
};

export default createMonthMatrix;
