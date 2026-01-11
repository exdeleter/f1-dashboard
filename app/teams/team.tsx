import { useParams, Link } from "react-router";

type Team = {
    id: number;
    name: string;
    logo: string;
    founded: number;
    base: string;
    engine: string;
    principal: string;
    championships: number;
    wins: number;
    podiums: number;
    drivers: {
        id: number;
        name: string;
        number: number;
    }[];
};

// mock
const mockTeam: Team = {
    id: 1,
    name: "Scuderia Ferrari",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg",
    founded: 1929,
    base: "Maranello, Italy",
    engine: "Ferrari",
    principal: "Frédéric Vasseur",
    championships: 16,
    wins: 243,
    podiums: 800,
    drivers: [
        { id: 16, name: "Charles Leclerc", number: 16 },
        { id: 55, name: "Carlos Sainz", number: 55 },
    ],
};

export function TeamView() {
    const { id } = useParams<{ id: string }>();

    // позже здесь будет загрузка по id
    const team = mockTeam;

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center gap-6">
                <img
                    src={team.logo}
                    alt={team.name}
                    className="w-24 h-24 object-contain"
                />

                <div>
                    <h1 className="text-3xl font-bold">{team.name}</h1>
                    <div className="text-gray-400">Founded: {team.founded}</div>
                    <div className="text-gray-400">Base: {team.base}</div>
                    <div className="text-gray-400">Engine: {team.engine}</div>
                    <div className="text-gray-400">
                        Team Principal: {team.principal}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Championships" value={team.championships} />
                <StatCard label="Wins" value={team.wins} />
                <StatCard label="Podiums" value={team.podiums} />
            </div>

            {/* Drivers */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Drivers</h2>

                <div className="grid grid-cols-2 gap-4">
                    {team.drivers.map((driver) => (
                        <div
                            key={driver.id}
                            className="rounded-xl bg-[#0b0f14] p-4 border border-gray-800"
                        >
                            <Link
                                to={`/pilots/${driver.id}`}
                                className="text-lg font-medium hover:underline hover:text-white transition"
                            >
                                {driver.name}
                            </Link>
                            <div className="text-gray-400">#{driver.number}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl bg-[#0b0f14] p-4 border border-gray-800">
            <div className="text-gray-400 text-sm">{label}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    );
}