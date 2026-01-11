import { Link } from "react-router";
import { racesData } from "~/races/races";

export function Welcome() {
    // Получаем ближайшие гонки (следующие 5)
    const today = new Date();
    const upcomingRaces = racesData
        .filter(race => new Date(race.startDate) >= today)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 5);

    // Статистика
    const totalRaces = racesData.length;
    const totalPilots = 20;
    const totalTeams = 10;

    return (
        <div className="flex flex-col gap-8 overflow-y-auto">
            {/* Hero Section */}
            <div className="text-center mb-4">
                <h1 className="text-4xl font-bold mb-2">Formula 1 Dashboard</h1>
                <p className="text-gray-400 text-lg">Welcome to the 2026 F1 Championship</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard 
                    label="Total Races" 
                    value={totalRaces}
                    icon="🏁"
                />
                <StatCard 
                    label="Drivers" 
                    value={totalPilots}
                    icon="👤"
                />
                <StatCard 
                    label="Teams" 
                    value={totalTeams}
                    icon="🏎️"
                />
            </div>

            {/* Upcoming Races */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Upcoming Races</h2>
                    <Link 
                        to="/races" 
                        className="text-sm text-gray-400 hover:text-white transition"
                    >
                        View All →
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingRaces.map((race) => (
                        <RaceCard key={race.id} race={race} />
                    ))}
                </div>
            </div>

            {/* Top Drivers */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Championship Standings</h2>
                    <Link 
                        to="/pilots" 
                        className="text-sm text-gray-400 hover:text-white transition"
                    >
                        View All →
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <DriverCard 
                        position={1}
                        name="Max Verstappen"
                        number={1}
                        team="Red Bull Racing"
                        points={25}
                        driverId={1}
                        isChampion={true}
                    />
                    <DriverCard 
                        position={2}
                        name="Charles Leclerc"
                        number={16}
                        team="Ferrari"
                        points={18}
                        driverId={5}
                    />
                    <DriverCard 
                        position={3}
                        name="Lewis Hamilton"
                        number={44}
                        team="Mercedes"
                        points={15}
                        driverId={3}
                    />
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
                <div className="grid grid-cols-3 gap-4">
                    <QuickLinkCard 
                        title="Races"
                        description="View all races and results"
                        link="/races"
                        icon="🏁"
                    />
                    <QuickLinkCard 
                        title="Drivers"
                        description="Browse all drivers"
                        link="/pilots"
                        icon="👤"
                    />
                    <QuickLinkCard 
                        title="Teams"
                        description="Explore all teams"
                        link="/teams"
                        icon="🏎️"
                    />
                </div>
            </div>
        </div>
    );
}

function StatCard({ 
    label, 
    value,
    icon 
}: { 
    label: string; 
    value: number;
    icon: string;
}) {
    return (
        <div className="rounded-xl bg-[#0b0f14] p-6 border border-gray-800 hover:border-gray-700 transition">
            <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{icon}</span>
                <div className="text-3xl font-bold">{value}</div>
            </div>
            <div className="text-gray-400 text-sm">{label}</div>
        </div>
    );
}

function RaceCard({ race }: { race: typeof racesData[0] }) {
    const startDate = new Date(race.startDate);
    const formattedDate = startDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Link 
            to={`/races/${race.id}`}
            className="rounded-xl bg-[#0b0f14] p-4 border border-gray-800 hover:border-gray-700 hover:bg-[#0f141b] transition block"
        >
            <div className="font-semibold text-lg mb-2">{race.name}</div>
            <div className="text-gray-400 text-sm mb-2">{race.venue}</div>
            <div className="text-gray-500 text-xs">{formattedDate}</div>
        </Link>
    );
}

function DriverCard({ 
    position, 
    name, 
    number, 
    team, 
    points,
    driverId,
    isChampion = false 
}: { 
    position: number;
    name: string;
    number: number;
    team: string;
    points: number;
    driverId: number;
    isChampion?: boolean;
}) {
    const positionColors = {
        1: "border-yellow-500 bg-yellow-500/10",
        2: "border-gray-400 bg-gray-400/10",
        3: "border-orange-600 bg-orange-600/10",
    };

    return (
        <Link 
            to={`/pilots/${driverId}`}
            className={`rounded-xl p-4 border-2 transition hover:scale-105 ${
                positionColors[position as keyof typeof positionColors] || "border-gray-800"
            } ${isChampion ? "bg-[#0b0f14]" : "bg-[#0b0f14]"}`}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-bold">P{position}</div>
                {isChampion && (
                    <span className="text-yellow-500 text-xl">👑</span>
                )}
            </div>
            <div className="font-semibold text-lg mb-1">{name}</div>
            <div className="text-gray-400 text-sm mb-2">#{number} • {team}</div>
            <div className="text-yellow-400 font-bold text-xl">{points} pts</div>
        </Link>
    );
}

function QuickLinkCard({ 
    title, 
    description, 
    link,
    icon 
}: { 
    title: string; 
    description: string;
    link: string;
    icon: string;
}) {
    return (
        <Link 
            to={link}
            className="rounded-xl bg-[#0b0f14] p-6 border border-gray-800 hover:border-gray-700 hover:bg-[#0f141b] transition block text-center"
        >
            <div className="text-4xl mb-3">{icon}</div>
            <div className="font-semibold text-lg mb-2">{title}</div>
            <div className="text-gray-400 text-sm">{description}</div>
        </Link>
    );
}
