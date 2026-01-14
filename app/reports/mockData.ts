import type { Report, ReportElement } from './types';

// Mock данные на основе PDF "2025 Las Vegas Grand Prix - Final Race Classification"

export const lasVegasRaceData = {
  raceName: "2025 LAS VEGAS GRAND PRIX",
  raceDate: "20 - 22 November 2025",
  laps: 50,
  distance: "309.958 km",
  results: [
    { position: 1, number: 1, driver: "Max VERSTAPPEN", team: "Oracle Red Bull Racing", laps: 50, time: "1:21:08.429", gap: "", points: 25, fastestLap: "1:33.365", fastestLapOn: 50 },
    { position: 2, number: 63, driver: "George RUSSELL", team: "Mercedes-AMG PETRONAS F1 Team", laps: 50, time: "1:21:31.975", gap: "23.546", points: 18, fastestLap: "1:34.592", fastestLapOn: 50 },
    { position: 3, number: 12, driver: "Kimi ANTONELLI", team: "Mercedes-AMG PETRONAS F1 Team", laps: 50, time: "1:21:38.917", gap: "30.488", points: 15, fastestLap: "1:33.998", fastestLapOn: 48 },
    { position: 4, number: 16, driver: "Charles LECLERC", team: "Scuderia Ferrari HP", laps: 50, time: "1:21:39.107", gap: "30.678", points: 12, fastestLap: "1:34.304", fastestLapOn: 43 },
    { position: 5, number: 55, driver: "Carlos SAINZ", team: "Atlassian Williams Racing", laps: 50, time: "1:21:43.353", gap: "34.924", points: 10, fastestLap: "1:34.496", fastestLapOn: 42 },
    { position: 6, number: 6, driver: "Isack HADJAR", team: "Visa Cash App Racing Bulls F1 Team", laps: 50, time: "1:21:53.686", gap: "45.257", points: 8, fastestLap: "1:34.620", fastestLapOn: 50 },
    { position: 7, number: 27, driver: "Nico HULKENBERG", team: "Stake F1 Team Kick Sauber", laps: 50, time: "1:21:59.563", gap: "51.134", points: 6, fastestLap: "1:34.592", fastestLapOn: 49 },
    { position: 8, number: 44, driver: "Lewis HAMILTON", team: "Scuderia Ferrari HP", laps: 50, time: "1:22:07.798", gap: "59.369", points: 4, fastestLap: "1:34.553", fastestLapOn: 49 },
    { position: 9, number: 31, driver: "Esteban OCON", team: "MoneyGram Haas F1 Team", laps: 50, time: "1:22:09.064", gap: "60.635", points: 2, fastestLap: "1:34.557", fastestLapOn: 48 },
    { position: 10, number: 87, driver: "Oliver BEARMAN", team: "MoneyGram Haas F1 Team", laps: 50, time: "1:22:18.978", gap: "70.549", points: 1, fastestLap: "1:34.519", fastestLapOn: 50 },
    { position: 11, number: 14, driver: "Fernando ALONSO", team: "Aston Martin Aramco F1 Team", laps: 50, time: "1:22:33.737", gap: "85.308", points: 0, fastestLap: "1:35.629", fastestLapOn: 41 },
    { position: 12, number: 22, driver: "Yuki TSUNODA", team: "Oracle Red Bull Racing", laps: 50, time: "1:22:35.403", gap: "86.974", points: 0, fastestLap: "1:34.967", fastestLapOn: 49 },
    { position: 13, number: 10, driver: "Pierre GASLY", team: "BWT Alpine F1 Team", laps: 50, time: "1:22:40.131", gap: "91.702", points: 0, fastestLap: "1:35.674", fastestLapOn: 44 },
    { position: 14, number: 30, driver: "Liam LAWSON", team: "Visa Cash App Racing Bulls F1 Team", laps: 49, time: "1:21:11.720", gap: "1 LAP", points: 0, fastestLap: "1:34.837", fastestLapOn: 47 },
    { position: 15, number: 43, driver: "Franco COLAPINTO", team: "BWT Alpine F1 Team", laps: 49, time: "1:21:18.888", gap: "1 LAP", points: 0, fastestLap: "1:35.780", fastestLapOn: 38 },
  ],
  notClassified: [
    { number: 23, driver: "Alexander ALBON", team: "Atlassian Williams Racing", laps: 35, time: "59:28.001", status: "DNF" },
    { number: 5, driver: "Gabriel BORTOLETO", team: "Stake F1 Team Kick Sauber", laps: 2, time: "4:52.053", status: "DNF" },
    { number: 18, driver: "Lance STROLL", team: "Aston Martin Aramco F1 Team", laps: 0, time: "", status: "DNF" },
  ],
  disqualified: [
    { number: 4, driver: "Lando NORRIS", team: "McLaren Formula 1 Team" },
    { number: 81, driver: "Oscar PIASTRI", team: "McLaren Formula 1 Team" },
  ],
  fastestLap: {
    driver: "Max VERSTAPPEN",
    team: "Oracle Red Bull Racing",
    time: "1:33.365",
    onLap: 50,
    speed: "239.100 km/h"
  },
  notes: "Subject to ongoing routine technical checks.",
  penalties: [
    "Car 12 - 5 second time penalty - False start - Stewards' document no. 48",
    "Cars 4 & 81 - Disqualified - Technical nonconformity - Stewards' document nos. 57 & 58"
  ]
};

// Создание mock отчета на основе данных
export function createMockReport(): Report {
  const now = new Date().toISOString();
  
  const elements: ReportElement[] = [
    {
      id: 'header-1',
      type: 'header',
      content: '2025 LAS VEGAS GRAND PRIX',
      level: 1
    },
    {
      id: 'text-1',
      type: 'text',
      content: '20 - 22 November 2025\nFinal Race Classification after 50 Laps - 309.958 km'
    },
    {
      id: 'table-1',
      type: 'table',
      title: 'Race Final Classification',
      columns: [
        { key: 'position', label: 'Pos' },
        { key: 'number', label: 'NO' },
        { key: 'driver', label: 'Driver' },
        { key: 'team', label: 'Team' },
        { key: 'laps', label: 'Laps' },
        { key: 'time', label: 'Time' },
        { key: 'gap', label: 'Gap' },
        { key: 'points', label: 'Points' }
      ],
      dataSource: 'raceResults',
      filters: { raceId: 'las-vegas-2025' }
    },
    {
      id: 'header-2',
      type: 'header',
      content: 'NOT CLASSIFIED',
      level: 2
    },
    {
      id: 'table-2',
      type: 'table',
      columns: [
        { key: 'number', label: 'NO' },
        { key: 'driver', label: 'Driver' },
        { key: 'team', label: 'Team' },
        { key: 'laps', label: 'Laps' },
        { key: 'status', label: 'Status' }
      ],
      dataSource: 'notClassified',
      filters: { raceId: 'las-vegas-2025' }
    },
    {
      id: 'header-3',
      type: 'header',
      content: 'DISQUALIFIED',
      level: 2
    },
    {
      id: 'table-3',
      type: 'table',
      columns: [
        { key: 'number', label: 'NO' },
        { key: 'driver', label: 'Driver' },
        { key: 'team', label: 'Team' }
      ],
      dataSource: 'disqualified',
      filters: { raceId: 'las-vegas-2025' }
    },
    {
      id: 'header-4',
      type: 'header',
      content: 'FASTEST LAP',
      level: 2
    },
    {
      id: 'text-2',
      type: 'text',
      content: 'Max VERSTAPPEN - Oracle Red Bull Racing - 1:33.365 on lap 50 - 239.100 km/h'
    },
    {
      id: 'header-5',
      type: 'header',
      content: 'NOTES',
      level: 2
    },
    {
      id: 'text-3',
      type: 'text',
      content: 'Subject to ongoing routine technical checks.'
    },
    {
      id: 'header-6',
      type: 'header',
      content: 'PENALTIES',
      level: 2
    },
    {
      id: 'text-4',
      type: 'text',
      content: 'Car 12 - 5 second time penalty - False start - Stewards\' document no. 48\nCars 4 & 81 - Disqualified - Technical nonconformity - Stewards\' document nos. 57 & 58'
    }
  ];

  return {
    id: 'mock-report-1',
    name: '2025 Las Vegas Grand Prix - Final Race Classification',
    pages: [
      {
        id: 'page-1',
        elements
      }
    ],
    parameters: {
      raceId: 'las-vegas-2025',
      season: 2025
    },
    createdAt: now,
    updatedAt: now
  };
}

