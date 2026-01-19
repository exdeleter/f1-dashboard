import { useParams } from "react-router";
import { useState } from "react";
import "./pilot.css";

type Pilot = {
    id: number;
    name: string;
    number: number;
    country: string;
    team: string;
    birthDate: string;
    championships: number;
    wins: number;
    podiums: number;
    points: number;
    image: string;
    imageFile: File | null;
};

// mock data
const mockPilot: Pilot = {
    id: 16,
    name: "Charles Leclerc",
    number: 16,
    country: "Monaco",
    team: "Scuderia Ferrari",
    birthDate: "1997-10-16",
    championships: 0,
    wins: 5,
    podiums: 30,
    points: 1200,
    image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7f/Charles_Leclerc_2023.jpg",
    imageFile: null
};

const teams = [
    "Scuderia Ferrari",
    "Red Bull Racing",
    "Mercedes",
    "McLaren",
    "Aston Martin",
    "Alpine",
    "Williams",
    "Haas",
    "Kick Sauber",
    "RB",
];

export function PilotView() {
    const { id } = useParams<{ id?: string }>();

    const isCreate = id === "0";
    const pilot = isCreate ? null : mockPilot;

    const [form, setForm] = useState<Pilot>(
        pilot ?? {
            id: 0,
            name: "",
            number: 0,
            country: "",
            team: "",
            birthDate: "",
            championships: 0,
            wins: 0,
            podiums: 0,
            points: 0,
            image: "",
            imageFile: null,
        }
    );

    function update<K extends keyof Pilot>(key: K, value: Pilot[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    // ===== CREATE MODE =====
    if (isCreate) {
        return (
            <div className="pilot-form">
                <h1 className="pilot-form-title">Create Pilot</h1>

                <div className="pilot-form-card">
                    <div className="pilot-form-grid">
                        <input
                            className="pilot-input"
                            value={form.name}
                            onChange={(e) =>
                                update("name", e.target.value)
                            }
                            placeholder="First name"
                        />

                        <input
                            className="pilot-input"
                            type="number"
                            value={form.number}
                            onChange={(e) =>
                                update("number", +e.target.value)
                            }
                            placeholder="Race number"
                        />

                        <input
                            className="pilot-input"
                            value={form.country}
                            onChange={(e) =>
                                update("country", e.target.value)
                            }
                            placeholder="Country"
                        />

                        <select
                            className="pilot-select"
                            value={form.team}
                            onChange={(e) =>
                                update("team", e.target.value)
                            }
                        >
                            <option value="">Select team</option>
                            {teams.map((team) => (
                                <option key={team} value={team}>
                                    {team}
                                </option>
                            ))}
                        </select>

                        <input
                            className="pilot-input"
                            type="date"
                            value={form.birthDate}
                            onChange={(e) =>
                                update("birthDate", e.target.value)
                            }
                        />

                        {/* ===== IMAGE UPLOAD ===== */}
                        <div className="pilot-upload">
                            <div className="pilot-upload-preview">
                                {form.imageFile ? (
                                    <img
                                        src={URL.createObjectURL(
                                            form.imageFile
                                        )}
                                        alt="Preview"
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm">
                                        No image
                                    </span>
                                )}
                            </div>

                            <label className="pilot-upload-button">
                                Upload image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) =>
                                        update(
                                            "imageFile",
                                            e.target.files?.[0] ?? null
                                        )
                                    }
                                />
                            </label>
                        </div>
                    </div>

                    <button className="pilot-button">
                        Save Pilot
                    </button>
                </div>
            </div>
        );
    }

    // ===== VIEW MODE =====
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
                <img
                    src={pilot!.image}
                    alt={pilot!.name}
                    className="w-32 h-32 rounded-xl object-cover"
                />

                <div>
                    <h1 className="text-3xl font-bold">
                        {pilot!.name}
                        <span className="ml-3 text-gray-400">
                            #{pilot!.number}
                        </span>
                    </h1>

                    <div className="text-gray-400">
                        Country: {pilot!.country}
                    </div>
                    <div className="text-gray-400">
                        Team: {pilot!.team}
                    </div>
                    <div className="text-gray-400">
                        Born: {pilot!.birthDate}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Championships" value={pilot!.championships} />
                <StatCard label="Wins" value={pilot!.wins} />
                <StatCard label="Podiums" value={pilot!.podiums} />
                <StatCard label="Points" value={pilot!.points} />
            </div>

            <div className="rounded-xl bg-[#0b0f14] p-6 border border-gray-800">
                <h2 className="text-xl font-semibold mb-2">Profile</h2>
                <p className="text-gray-300">
                    Charles Leclerc is a Monegasque Formula 1 driver racing for
                    Scuderia Ferrari...
                </p>
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