// Enum representing different languages a user can speak
enum Language {
  English = "english",
  Spanish = "spanish",
  Portuguese = "portuguese",
  French = "french",
  Italian = "italian",
  German = "german",
  Dutch = "dutch",
  Swedish = "swedish",
  Norwegian = "norwegian",
  Danish = "danish",
  Icelandic = "icelandic",
  Finnish = "finnish",
  Estonian = "estonian",
  Latvian = "latvian",
  Lithuanian = "lithuanian",
  Russian = "russian",
  Ukrainian = "ukrainian",
  Belarusian = "belarusian",
  Polish = "polish",
  Czech = "czech",
  Slovak = "slovak",
  Slovenian = "slovenian",
  Serbian = "serbian",
  Croatian = "croatian",
  Bosnian = "bosnian",
  Bulgarian = "bulgarian",
  Romanian = "romanian",
  Hungarian = "hungarian",
  Turkish = "turkish",
  Greek = "greek",
  Chinese = "chinese",
  Japanese = "japanese",
  Korean = "korean",
}

// Enum representing different zodiac signs
enum ZodiacSign {
  Aries = "aries", // March 21 - April 19
  Taurus = "taurus", // April 20 - May 20
  Gemini = "gemini", // May 21 - June 20
  Cancer = "cancer", // June 21 - July 22
  Leo = "leo", // July 23 - August 22
  Virgo = "virgo", // August 23 - September 22
  Libra = "libra", // September 23 - October 22
  Scorpio = "scorpio", // October 23 - November 21
  Sagittarius = "sagittarius", // November 22 - December 21
  Capricorn = "capricorn", // December 22 - January 19
  Aquarius = "aquarius", // January 20 - February 18
  Pisces = "pisces", // February 19 - March 20
}

// Enum representing different education levels
enum EducationLevel {
  HighSchool = "high school",
  College = "college",
  Bachelor = "bachelor",
  Master = "master",
  Doctorate = "doctorate",
  University = "university",
  DropOut = "drop out",
  Other = "other",
}

// Enum representing different passions or interests
enum Passion {
  Sports = "sports",
  Travel = "travel",
  Entrepreneurship = "entrepreneurship",
  Walking = "walking",
  Startups = "start ups",
}

// Object containing arrays of possible values for user profile attributes
export const userProfileData = {
  languages: Object.values(Language),
  zodiac: Object.values(ZodiacSign),
  education: Object.values(EducationLevel),
  passions: Object.values(Passion),
};
