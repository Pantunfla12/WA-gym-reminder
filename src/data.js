const routines = [
  "Pectoral - Triceps",
  "Abdomen - Cardio",
  "Espalda - Biceps",
  "Cuadriceps - Pantorrillas",
  "Abdomen - Hombros",
  "Femorales - Glúteos",
];

const schedule = [
  { day: "Monday", isWorkDay: true },
  { day: "Tuesday", isWorkDay: true },
  { day: "Wednesday", isWorkDay: false },
  { day: "Thursday", isWorkDay: true },
  { day: "Friday", isWorkDay: false },
  { day: "Saturday", isWorkDay: true },
  { day: "Sunday", isWorkDay: false },
];

module.exports = { routines, schedule };
