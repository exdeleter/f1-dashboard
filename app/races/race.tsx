import { useParams, Link } from "react-router";
import { type Column, DataTable } from "~/components/table/table";

type RaceResult = {
    id: number;
    position: number;
    driver: {
        id: number;
        name: string;
        number: number;
    };
    team: string;
    time: string;
    points: number;
};

type Race = {
    id: number;
    name: string;
    venue: string;
    circuit: string;
    startDate: string;
    endDate: string;
    raceDate: string;
    laps: number;
    winner: {
        id: number;
        name: string;
        number: number;
    };
    fastestLap: {
        driver: string;
        time: string;
    };
    results: RaceResult[];
};

// mock data
const mockRace: Race = {
    id: 1,
    name: "Australian Grand Prix",
    venue: "Melbourne, Albert Park",
    circuit: "Albert Park Circuit",
    startDate: "2026-03-06",
    endDate: "2026-03-08",
    raceDate: "2026-03-08",
    laps: 58,
    winner: {
        id: 1,
        name: "Max Verstappen",
        number: 1,
    },
    fastestLap: {
        driver: "Charles Leclerc",
        time: "1:20.915",
    },
    results: [
        { id: 1, position: 1, driver: { id: 1, name: "Max Verstappen", number: 1 }, team: "Red Bull Racing", time: "1:32:15.123", points: 25 },
        { id: 2, position: 2, driver: { id: 16, name: "Charles Leclerc", number: 16 }, team: "Scuderia Ferrari", time: "+2.456", points: 18 },
        { id: 3, position: 3, driver: { id: 44, name: "Lewis Hamilton", number: 44 }, team: "Mercedes", time: "+5.789", points: 15 },
        { id: 4, position: 4, driver: { id: 55, name: "Carlos Sainz", number: 55 }, team: "Scuderia Ferrari", time: "+8.234", points: 12 },
        { id: 5, position: 5, driver: { id: 11, name: "Sergio Pérez", number: 11 }, team: "Red Bull Racing", time: "+12.567", points: 10 },
        { id: 6, position: 6, driver: { id: 4, name: "Lando Norris", number: 4 }, team: "McLaren", time: "+15.890", points: 8 },
        { id: 7, position: 7, driver: { id: 63, name: "George Russell", number: 63 }, team: "Mercedes", time: "+18.123", points: 6 },
        { id: 8, position: 8, driver: { id: 81, name: "Oscar Piastri", number: 81 }, team: "McLaren", time: "+21.456", points: 4 },
        { id: 9, position: 9, driver: { id: 14, name: "Fernando Alonso", number: 14 }, team: "Aston Martin", time: "+24.789", points: 2 },
        { id: 10, position: 10, driver: { id: 18, name: "Lance Stroll", number: 18 }, team: "Aston Martin", time: "+27.123", points: 1 },
    ],
};

export function RaceView() {
    const { id, season } = useParams<{ id: string; season: string }>();

    // позже здесь будет загрузка по id
    const race = mockRace;

    return (
        <div className="flex flex-col gap-8 overflow-y-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">{race.name}</h1>
                <div className="text-gray-400">{race.venue}</div>
                <div className="text-gray-400">Circuit: {race.circuit}</div>
                <div className="text-gray-400">
                    Race Date: {race.raceDate}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Laps" value={race.laps} />
                <StatCard 
                    label="Winner" 
                    value={race.winner.name}
                    isText={true}
                />
                <StatCard 
                    label="Fastest Lap" 
                    value={race.fastestLap.time}
                    isText={true}
                />
                <StatCard 
                    label="Fastest Lap Driver" 
                    value={race.fastestLap.driver}
                    isText={true}
                />
            </div>

            {/* Podium */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Podium</h2>
                <div className="grid grid-cols-3 gap-4">
                    {race.results.slice(0, 3).map((result, index) => (
                        <div
                            key={result.position}
                            className={`rounded-xl bg-[#0b0f14] p-4 border border-gray-800 ${
                                index === 0 ? "border-yellow-500" : ""
                            }`}
                        >
                            <div className="text-2xl font-bold mb-2">
                                P{result.position}
                            </div>
                            <Link
                                to={`/${season}/pilots/${result.driver.id}`}
                                className="text-lg font-medium hover:underline hover:text-white transition block"
                            >
                                {result.driver.name}
                            </Link>
                            <div className="text-gray-400">#{result.driver.number}</div>
                            <div className="text-gray-400 text-sm mt-1">{result.team}</div>
                            <div className="text-gray-400 text-sm">{result.time}</div>
                            <div className="text-yellow-400 font-semibold mt-2">
                                {result.points} pts
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Race Results</h2>
                <RaceResultsTable results={race.results} />
            </div>
        </div>
    );
}

function StatCard({ 
    label, 
    value, 
    isText = false 
}: { 
    label: string; 
    value: number | string;
    isText?: boolean;
}) {
    return (
        <div className="rounded-xl bg-[#0b0f14] p-4 border border-gray-800">
            <div className="text-gray-400 text-sm">{label}</div>
            <div className={`${isText ? "text-lg" : "text-2xl"} font-bold mt-1`}>
                {value}
            </div>
        </div>
    );
}

function RaceResultsTable({ results }: { results: RaceResult[] }) {
    const { season } = useParams<{ season: string }>();
    const columns: Column<RaceResult>[] = [
        {
            name: "Position",
            path: "position",
            render: (value) => (
                <span className="font-bold">{value as number}</span>
            ),
        },
        {
            name: "Driver",
            path: "driver",
            render: (value) => {
                const driver = value as RaceResult["driver"];
                return (
                    <Link
                        to={`/${season}/pilots/${driver.id}`}
                        className="hover:underline hover:text-white transition"
                    >
                        {driver.name} #{driver.number}
                    </Link>
                );
            },
        },
        {
            name: "Team",
            path: "team",
            render: (value) => (
                <span className="text-gray-400">{value as string}</span>
            ),
        },
        {
            name: "Time",
            path: "time",
            render: (value) => (
                <span className="text-gray-400">{value as string}</span>
            ),
        },
        {
            name: "Points",
            path: "points",
            render: (value) => (
                <span className="text-yellow-400 font-semibold">
                    {value as number}
                </span>
            ),
        },
    ];

    return <DataTable<RaceResult> data={results} columns={columns} />;
}