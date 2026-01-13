import {Action, type Column, DataTable} from "~/../app/components/table/table";
import {useNavigate, useParams} from "react-router";

import "./pilotListStyle.css";

type Pilot = {
    id: number;
    name: string;
    surname: string;
    number: number;
    command: string;
};

const pilots: Pilot[] = [
    { id: 1, name: "Max", surname: "Verstappen", number: 1, command: "Red Bull Racing" },
    { id: 2, name: "Sergio", surname: "Perez", number: 11, command: "Red Bull Racing" },

    { id: 3, name: "Lewis", surname: "Hamilton", number: 44, command: "Mercedes" },
    { id: 4, name: "George", surname: "Russell", number: 63, command: "Mercedes" },

    { id: 5, name: "Charles", surname: "Leclerc", number: 16, command: "Ferrari" },
    { id: 6, name: "Carlos", surname: "Sainz", number: 55, command: "Ferrari" },

    { id: 7, name: "Lando", surname: "Norris", number: 4, command: "McLaren" },
    { id: 8, name: "Oscar", surname: "Piastri", number: 81, command: "McLaren" },

    { id: 9, name: "Fernando", surname: "Alonso", number: 14, command: "Aston Martin" },
    { id: 10, name: "Lance", surname: "Stroll", number: 18, command: "Aston Martin" },

    { id: 11, name: "Esteban", surname: "Ocon", number: 31, command: "Alpine" },
    { id: 12, name: "Pierre", surname: "Gasly", number: 10, command: "Alpine" },

    { id: 13, name: "Alexander", surname: "Albon", number: 23, command: "Williams" },
    { id: 14, name: "Logan", surname: "Sargeant", number: 2, command: "Williams" },

    { id: 15, name: "Kevin", surname: "Magnussen", number: 20, command: "Haas" },
    { id: 16, name: "Nico", surname: "Hulkenberg", number: 27, command: "Haas" },

    { id: 17, name: "Yuki", surname: "Tsunoda", number: 22, command: "Racing Bulls" },
    { id: 18, name: "Daniel", surname: "Ricciardo", number: 3, command: "Racing Bulls" },

    { id: 19, name: "Valtteri", surname: "Bottas", number: 77, command: "Kick Sauber" },
    { id: 20, name: "Zhou", surname: "Guanyu", number: 24, command: "Kick Sauber" },
];

const pilotColumns: Column<Pilot>[] = [
    {
        name: "view",
        path: "id",
        action: Action.Edit,
    },
    {
        name: "Name",
        path: "name",
    },
    {
        name: "Surname",
        path: "surname",
    },
    {
        name: "Number",
        path: "number",
    },
    {
        name: "Team",
        path: "command",
    },
];

export function PilotList() {
    const navigate = useNavigate();
    const { season } = useParams<{ season: string }>();

    function onClick(pilot: Pilot) {
        navigate(`/${season}/pilots/${pilot.id}`);
    }

    function onClickNew() {
        navigate(`/${season}/pilots/0`);
    }
    
    return (<>
            <div className="toolbar">
                <button className="custom-button" onClick={onClickNew}>Create</button>
            </div>
            
            <DataTable
                data={pilots}
                columns={pilotColumns}
                onEdit={onClick}
            />
    </>
        
);
}