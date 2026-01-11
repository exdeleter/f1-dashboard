import { Outlet, NavLink, Link } from "react-router";
import F1 from "~/routes/F1.svg";
import { Breadcrumbs } from "~/components/breadcrumbs";

export default function Layout() {
    return (
        <div className="app">
            <aside className="sidebar">
                {/* Header */}
                <div className="sidebar-header">
                    <Link to="/">
                        <img src={F1} alt="F1" className="w-24 mx-auto cursor-pointer hover:opacity-80 transition" />
                    </Link>
                </div>

                {/* Divider */}
                <div className="sidebar-divider" />

                {/* Navigation */}
                <nav className="sidebar-nav">
                    <NavLink to="/teams">Teams</NavLink>
                    <NavLink to="/pilots">Pilots</NavLink>
                    <NavLink to="/races">Races</NavLink>
                </nav>
            </aside>

            {/* Content */}
            <main className="main">
                <div className="upBar">
                    <Breadcrumbs />

                    <div className="flex m-3 p-2 w-14 h-14">
                        <div className="flex h-full w-full bg-red-950 rounded-4xl"></div>
                    </div>
                </div>

                <div className="content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}