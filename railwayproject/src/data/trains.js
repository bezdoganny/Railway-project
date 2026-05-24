// ============================================================
// trains.js — Дані про потяги та рейси (mock-дані)
// Використовується як локальна "база даних" для розробки.
// В реальному проєкті ці дані прийшли б із API-сервера.
// ============================================================

export const trains = [
  {
    id: "743",
    number: "743 Інтерсіті",
    from: "Київ",
    to: "Львів",
    departureDate: "2025-06-15",
    departureTime: "07:00",
    arrivalTime: "13:30",
    duration: "6г 30хв",
    type: "Інтерсіті+",
    price: 620,
    wagons: [
      {
        id: "w1",
        number: 1,
        type: "Економ",
        totalSeats: 54,
        bookedSeats: [3, 7, 12, 15, 22, 31, 44, 50],
        priceMultiplier: 1,
      },
      {
        id: "w2",
        number: 2,
        type: "Бізнес",
        totalSeats: 36,
        bookedSeats: [2, 5, 10, 18],
        priceMultiplier: 1.8,
      },
      {
        id: "w3",
        number: 3,
        type: "Економ",
        totalSeats: 54,
        bookedSeats: [1, 4, 9, 16, 25, 36],
        priceMultiplier: 1,
      },
    ],
  },
  {
    id: "105",
    number: "105 Нічний",
    from: "Київ",
    to: "Одеса",
    departureDate: "2025-06-15",
    departureTime: "21:45",
    arrivalTime: "07:20",
    duration: "9г 35хв",
    type: "Нічний",
    price: 480,
    wagons: [
      {
        id: "w4",
        number: 1,
        type: "Плацкарт",
        totalSeats: 54,
        bookedSeats: [2, 6, 11, 14, 20, 33, 41],
        priceMultiplier: 1,
      },
      {
        id: "w5",
        number: 2,
        type: "Купе",
        totalSeats: 36,
        bookedSeats: [4, 8, 12, 16, 20],
        priceMultiplier: 1.5,
      },
      {
        id: "w6",
        number: 3,
        type: "СВ",
        totalSeats: 18,
        bookedSeats: [3, 6],
        priceMultiplier: 2.2,
      },
    ],
  },
  {
    id: "84",
    number: "84 Регіональний",
    from: "Харків",
    to: "Дніпро",
    departureDate: "2025-06-15",
    departureTime: "09:15",
    arrivalTime: "12:50",
    duration: "3г 35хв",
    type: "Регіональний",
    price: 195,
    wagons: [
      {
        id: "w7",
        number: 1,
        type: "Економ",
        totalSeats: 54,
        bookedSeats: [5, 10, 15, 20, 25, 30],
        priceMultiplier: 1,
      },
      {
        id: "w8",
        number: 2,
        type: "Бізнес",
        totalSeats: 36,
        bookedSeats: [1, 7, 13],
        priceMultiplier: 1.7,
      },
    ],
  },
  {
    id: "226",
    number: "226 Карпати",
    from: "Київ",
    to: "Ужгород",
    departureDate: "2025-06-16",
    departureTime: "14:30",
    arrivalTime: "01:05",
    duration: "10г 35хв",
    type: "Нічний",
    price: 540,
    wagons: [
      {
        id: "w9",
        number: 1,
        type: "Плацкарт",
        totalSeats: 54,
        bookedSeats: [7, 14, 21, 28, 35, 42, 49],
        priceMultiplier: 1,
      },
      {
        id: "w10",
        number: 2,
        type: "Купе",
        totalSeats: 36,
        bookedSeats: [2, 9, 16, 23],
        priceMultiplier: 1.6,
      },
    ],
  },
  {
    id: "771",
    number: "771 Столичний",
    from: "Львів",
    to: "Київ",
    departureDate: "2025-06-15",
    departureTime: "06:45",
    arrivalTime: "13:10",
    duration: "6г 25хв",
    type: "Інтерсіті+",
    price: 610,
    wagons: [
      {
        id: "w11",
        number: 1,
        type: "Економ",
        totalSeats: 54,
        bookedSeats: [1, 3, 5, 7, 9, 11, 13],
        priceMultiplier: 1,
      },
      {
        id: "w12",
        number: 2,
        type: "Бізнес",
        totalSeats: 36,
        bookedSeats: [2, 6, 10],
        priceMultiplier: 1.8,
      },
      {
        id: "w13",
        number: 3,
        type: "Преміум",
        totalSeats: 20,
        bookedSeats: [4, 8],
        priceMultiplier: 2.5,
      },
    ],
  },
  {
    id: "47",
    number: "47 Причорноморський",
    from: "Харків",
    to: "Херсон",
    departureDate: "2025-06-17",
    departureTime: "18:00",
    arrivalTime: "06:30",
    duration: "12г 30хв",
    type: "Нічний",
    price: 430,
    wagons: [
      {
        id: "w14",
        number: 1,
        type: "Плацкарт",
        totalSeats: 54,
        bookedSeats: [4, 8, 16, 24, 32, 40, 48],
        priceMultiplier: 1,
      },
      {
        id: "w15",
        number: 2,
        type: "Купе",
        totalSeats: 36,
        bookedSeats: [3, 11, 19, 27],
        priceMultiplier: 1.5,
      },
    ],
  },
];

// Допоміжні функції для роботи з даними
export const getTrainById = (id) => trains.find((t) => t.id === id);

export const getAllCities = () => {
  const cities = new Set();
  trains.forEach((t) => {
    cities.add(t.from);
    cities.add(t.to);
  });
  return [...cities].sort();
};
