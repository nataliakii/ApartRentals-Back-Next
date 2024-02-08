exports.getArrayOfBookedDates = function (checkIn, checkOut) {
  let bookedDates = [];

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  for (
    let date = startDate;
    date < endDate - 1;
    date.setDate(date.getDate() + 1)
  ) {
    bookedDates.push(new Date(date));
  }

  return bookedDates;
};
