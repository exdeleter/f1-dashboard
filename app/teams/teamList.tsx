import { type Column, DataTable, Action } from "~/../app/components/table/table";
import { useNavigate, useParams } from "react-router";
import "./teamListStyle.css";
import { useTeams } from "~/hooks/useTeams";

// Определение интерфейса Team
export interface Team {
    id: string;
    name: string;
    shortName: string;
    engine: string;
    colorHex: string;
    seasonId: string;
}

const columns: Column<Team>[] = [
    {
        name: "edit",
        path: "id",
        action: Action.Edit
    },
    {
        name: "Name",
        path: "name",
    },
    {
        name: "Short Name",
        path: "shortName",
    },
    {
        name: "Engine",
        path: "engine",
    },
    {
        name: "Color",
        path: "colorHex",
        render: (value) => (
            <div
                style={{
                    width: 30,
                    height: 30,
                    backgroundColor: value as string,
                    borderRadius: 4,
                    border: "1px solid #ccc"
                }}
                title={value as string}
            />
        ),
    },
];

export function TeamList() {
    const navigate = useNavigate();
    const { season } = useParams<{ season: string }>();
    const {
        teams,
        loading,
        error,
        reload
    } = useTeams(season);

    function onClick(team: Team) {
        navigate(`/${season}/teams/${team.id}`);
    }

    function onClickNew() {
        navigate(`/${season}/teams/new`);
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <>
            <div className="toolbar">
                <button className="custom-button" onClick={onClickNew}>
                    Create Team
                </button>
                <button className="custom-button secondary" onClick={reload}>
                    Refresh
                </button>
            </div>

            <DataTable<Team>
                data={teams}
                columns={columns}
                onEdit={onClick}
                // onDelete={handleDelete}
                loading={loading}
            />
        </>
    );
}