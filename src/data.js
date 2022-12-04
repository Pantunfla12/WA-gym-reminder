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

const comandos = [
  "•!comandos - Lista de comandos",
  "•!rutina - te dice que rutina es hoy",
  "•!ping - pong",
  "•!sticker - te manda un sticker",
  "•!only - ?",
];

module.exports = { routines, schedule, comandos };
