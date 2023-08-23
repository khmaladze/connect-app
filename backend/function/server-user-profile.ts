type ZodiacSign =
  | "Aquarius"
  | "Pisces"
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn";

export const getZodiacSign = (month: number, day: number): ZodiacSign => {
  const zodiacs: ZodiacSign[] = [
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
  ];

  // Array of dates in the format of [month, day]
  const dates: [number, number][] = [
    [1, 20],
    [2, 19],
    [3, 21],
    [4, 20],
    [5, 21],
    [6, 21],
    [7, 23],
    [8, 23],
    [9, 23],
    [10, 23],
    [11, 22],
    [12, 22],
  ];

  const index = dates.findIndex(
    ([zodiacMonth, zodiacDay]) => month === zodiacMonth && day >= zodiacDay
  );

  return zodiacs[index !== -1 ? index : 11];
};

export const isValidDate = (
  year: number,
  month: number,
  day: number
): boolean => {
  if (month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = new Date(year, month, 0).getDate();

  if (month === 2 && day > 29) {
    return false;
  } else if (day < 1 || day > daysInMonth) {
    return false;
  }

  return true;
};

export const getDateAfter7Days = () => {
  const currentDate = new Date(); // Get current date and time
  const futureDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days (in milliseconds)

  // const year = futureDate.getFullYear(); // Get the year
  // const month = String(futureDate.getMonth() + 1).padStart(2, "0"); // Get the month (0-11) and pad with leading zero if necessary
  // const day = String(futureDate.getDate()).padStart(2, "0"); // Get the day (1-31) and pad with leading zero if necessary

  return futureDate.toISOString();
  // return futureDate.toISOString().split("T")[0]; // Format the date as "yyyy-mm-dd"
};
