import { Outlet, NavLink, Link, useParams, useLocation, useNavigate } from "react-router";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { getAvailableSeasons, getDefaultSeason } from "~/utils/useSeason";

function SeasonSelect() {
    const { season } = useParams<{ season?: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const seasons = getAvailableSeasons();
    const currentSeason = season ? Number(season) : getDefaultSeason();

    function handleSeasonChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newSeason = e.target.value;
        const path = location.pathname;

        // Extract current section (pilots/teams/races) and id if present
        const pathParts = path.split("/").filter(Boolean);
        
        // If we're on a season route, replace the season
        if (pathParts.length > 0 && /^\d{4}$/.test(pathParts[0])) {
            pathParts[0] = newSeason;
            navigate(`/${pathParts.join("/")}`);
        } else {
            // If not on a season route, go to season home
            navigate(`/${newSeason}`);
        }
    }

    return (
        <select
            value={currentSeason}
            onChange={handleSeasonChange}
            className="bg-[#0b0f14] border border-gray-800 rounded-lg p-2 text-white focus:outline-none focus:border-red-600 transition"
        >
            {seasons.map(s => (
                <option key={s} value={s}>{s}</option>
            ))}
        </select>
    );
}

export default function Layout() {
    const { season } = useParams<{ season?: string }>();
    const currentSeason = season || getDefaultSeason().toString();

    return (
        <div className="app">
            <aside className="sidebar">
                {/* Header */}
                <div className="sidebar-header">
                    <Link to={`/${currentSeason}`}>
                        <img src="/F1.svg" alt="F1" className="w-24 mx-auto cursor-pointer hover:opacity-80 transition" />
                    </Link>
                </div>

                {/* Divider */}
                <div className="sidebar-divider" />

                {/* Navigation */}
                <nav className="sidebar-nav">
                    <NavLink to={`/${currentSeason}/teams`}>Teams</NavLink>
                    <NavLink to={`/${currentSeason}/pilots`}>Pilots</NavLink>
                    <NavLink to={`/${currentSeason}/races`}>Races</NavLink>
                    <NavLink to="/reports">Reports</NavLink>
                </nav>
            </aside>

            {/* Content */}
            <main className="main">
                <div className="upBar">
                    <Breadcrumbs />

                    <div className="flex items-center gap-4">
                        <SeasonSelect />
                        <div className="flex m-3 p-2 w-14 h-14">
                            <div className="flex h-full w-full bg-red-950 rounded-4xl"></div>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}