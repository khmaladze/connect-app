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
  Aries = "aries",
  Taurus = "taurus",
  Gemini = "gemini",
  Cancer = "cancer",
  Leo = "leo",
  Virgo = "virgo",
  Libra = "libra",
  Scorpio = "scorpio",
  Sagittarius = "sagittarius",
  Capricorn = "capricorn",
  Aquarius = "aquarius",
  Pisces = "pisces",
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
