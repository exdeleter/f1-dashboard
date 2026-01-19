import { useState } from 'react';
import { type Column, DataTable, Action } from "~/components/table/table";


type SessionType =
    | 'practice-1'
    | 'practice-2'
    | 'practice-3'
    | 'qualifying'
    | 'starting-grid'
    | 'pit-stops'
    | 'fastest-laps'
    | 'race-result';

const sessions: { value: SessionType; label: string }[] = [
    { value: 'practice-1', label: 'Practice 1' },
    { value: 'practice-2', label: 'Practice 2' },
    { value: 'practice-3', label: 'Practice 3' },
    { value: 'qualifying', label: 'Qualifying' },
    { value: 'starting-grid', label: 'Starting Grid' },
    { value: 'pit-stops', label: 'Pit Stop Summary' },
    { value: 'fastest-laps', label: 'Fastest Laps' },
    { value: 'race-result', label: 'Race Result' },
];

export function RaceView() {
    const [selectedSession, setSelectedSession] =
        useState<SessionType>('race-result');

    return (
        <div className="flex flex-col gap-8">
            {/* ===== Race info ===== */}
            <RaceInfo />

            {/* ===== Session selector ===== */}
            <SessionSelector
                value={selectedSession}
                onChange={setSelectedSession}
            />

            {/* ===== Session content ===== */}
            <SessionResults session={selectedSession} />
        </div>
    );
}

function RaceInfo() {
    return (
        <div className="rounded-xl bg-[#0b0f14] p-6 border border-gray-800">
            <h1 className="text-2xl font-bold mb-2">
                Formula 1 Las Vegas Grand Prix 2025
            </h1>

            <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm">
                <div><span className="text-gray-400">Circuit:</span> Las Vegas Street Circuit</div>
                <div><span className="text-gray-400">Country:</span> USA</div>
                <div><span className="text-gray-400">Date:</span> 22–24 November 2025</div>
                <div><span className="text-gray-400">Distance:</span> 309.958 km</div>
            </div>
        </div>
    );
}

type SessionSelectorProps = {
    value: string;
    onChange: (value: any) => void;
};

function SessionSelector({ value, onChange }: SessionSelectorProps) {
    return (
        <div className="flex items-center gap-4">
      <span className="text-gray-400 text-sm">
        Show results for:
      </span>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
          bg-[#0b0f14]
          border border-gray-800
          rounded-lg
          px-4 py-2
          text-white
          focus:outline-none
          focus:border-red-600
        "
            >
                {sessions.map((s) => (
                    <option key={s.value} value={s.value}>
                        {s.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function SessionResults({ session }: { session: string }) {
    const data = mockResults[session] ?? [];

    return (
        <div className="rounded-xl bg-[#0b0f14] p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">
                {session.replace("-", " ").toUpperCase()}
            </h2>

            {data.length === 0 ? (
                <div className="text-gray-400">
                    No results available for this session
                </div>
            ) : (
                <DataTable
                    data={data}
                    columns={raceResultColumns}
                />
            )}
        </div>
    );
}

type RaceResultRow = {
    id: number;
    position: number;
    driver: string;
    team: string;
    time: string;
    laps: number;
    points?: number;
};

const raceResultColumns: Column<RaceResultRow>[] = [
    { name: "Pos", path: "position" },
    { name: "Driver", path: "driver" },
    { name: "Team", path: "team" },
    { name: "Time", path: "time" },
    { name: "Laps", path: "laps" },
    {
        name: "Pts",
        path: "points",
        render: (value) => value ?? "—",
    },
];

const mockResults: Record<string, RaceResultRow[]> = {
    "practice-1": [
        {
            id: 1,
            position: 1,
            driver: "Max Verstappen",
            team: "Red Bull Racing",
            time: "1:34.876",
            laps: 28,
        },
        {
            id: 2,
            position: 2,
            driver: "Charles Leclerc",
            team: "Ferrari",
            time: "+0.214",
            laps: 30,
        },
    ],

    qualifying: [
        {
            id: 3,
            position: 1,
            driver: "Carlos Sainz",
            team: "Ferrari",
            time: "1:33.921",
            laps: 12,
        },
        {
            id: 4,
            position: 2,
            driver: "George Russell",
            team: "Mercedes",
            time: "+0.082",
            laps: 11,
        },
    ],

    "race-result": [
        {
            id: 5,
            position: 1,
            driver: "Max Verstappen",
            team: "Red Bull Racing",
            time: "1:29:14.321",
            laps: 50,
            points: 25,
        },
        {
            id: 6,
            position: 2,
            driver: "Lando Norris",
            team: "McLaren",
            time: "+3.218",
            laps: 50,
            points: 18,
        },
        {
            id: 7,
            position: 3,
            driver: "Lewis Hamilton",
            team: "Mercedes",
            time: "+7.904",
            laps: 50,
            points: 15,
        },
    ],
};