function convertMonthToNumber(monthText) {
  const lowercaseMonth = monthText.toLowerCase();
  switch (lowercaseMonth) {
    case "january":
      return 1;
    case "february":
      return 2;
    case "march":
      return 3;
    case "april":
      return 4;
    case "may":
      return 5;
    case "june":
      return 6;
    case "july":
      return 7;
    case "august":
      return 8;
    case "september":
      return 9;
    case "october":
      return 10;
    case "november":
      return 11;
    case "december":
      return 12;
    default:
      return -1;
  }
}
function getAge(month, day, year) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  let age = currentYear - year;
  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age--;
  }
  return age;
}
function fixDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

const getGlobalUrl = (url) => {
  const PORT = 18169;
  const HOST = `http://localhost:${PORT}`;
  // const HOST = "https://mia-server.onrender.com";
  if (url) return `${HOST}${url}`;
  return `${HOST}`;
};

export { convertMonthToNumber, getAge, getGlobalUrl, fixDate };
