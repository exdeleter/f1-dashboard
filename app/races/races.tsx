import { type Column, DataTable, Action } from "~/components/table/table";
import { useNavigate, useParams } from "react-router";

export type Race = {
    id: number;
    name: string;
    venue: string;
    startDate: string;
    endDate: string;
};

export const racesData: Race[] = [
    { id: 1, name: "Australian Grand Prix", venue: "Melbourne, Albert Park", startDate: "2026-03-06", endDate: "2026-03-08" },
    { id: 2, name: "Chinese Grand Prix", venue: "Shanghai International Circuit", startDate: "2026-03-13", endDate: "2026-03-15" },
    { id: 3, name: "Japanese Grand Prix", venue: "Suzuka Circuit", startDate: "2026-03-27", endDate: "2026-03-29" },
    { id: 4, name: "Bahrain Grand Prix", venue: "Bahrain International Circuit", startDate: "2026-04-10", endDate: "2026-04-12" },
    { id: 5, name: "Saudi Arabian Grand Prix", venue: "Jeddah Corniche Circuit", startDate: "2026-04-17", endDate: "2026-04-19" },
    { id: 6, name: "Miami Grand Prix", venue: "Miami International Autodrome", startDate: "2026-05-01", endDate: "2026-05-03" },
    { id: 7, name: "Canadian Grand Prix", venue: "Circuit Gilles Villeneuve", startDate: "2026-05-22", endDate: "2026-05-24" },
    { id: 8, name: "Monaco Grand Prix", venue: "Circuit de Monaco", startDate: "2026-06-05", endDate: "2026-06-07" },
    { id: 9, name: "Barcelona-Catalunya Grand Prix", venue: "Circuit de Barcelona-Catalunya", startDate: "2026-06-12", endDate: "2026-06-14" },
    { id: 10, name: "Austrian Grand Prix", venue: "Red Bull Ring", startDate: "2026-06-26", endDate: "2026-06-28" },
    { id: 11, name: "British Grand Prix", venue: "Silverstone Circuit", startDate: "2026-07-03", endDate: "2026-07-05" },
    { id: 12, name: "Belgian Grand Prix", venue: "Spa-Francorchamps", startDate: "2026-07-17", endDate: "2026-07-19" },
    { id: 13, name: "Hungarian Grand Prix", venue: "Hungaroring", startDate: "2026-07-24", endDate: "2026-07-26" },
    { id: 14, name: "Dutch Grand Prix", venue: "Circuit Zandvoort", startDate: "2026-08-21", endDate: "2026-08-23" },
    { id: 15, name: "Italian Grand Prix", venue: "Autodromo Nazionale Monza", startDate: "2026-09-04", endDate: "2026-09-06" },
    { id: 16, name: "Spanish Grand Prix", venue: "Madrid (Madring)", startDate: "2026-09-11", endDate: "2026-09-13" },
    { id: 17, name: "Azerbaijan Grand Prix", venue: "Baku City Circuit", startDate: "2026-09-24", endDate: "2026-09-26" },
    { id: 18, name: "Singapore Grand Prix", venue: "Marina Bay Street Circuit", startDate: "2026-10-09", endDate: "2026-10-11" },
    { id: 19, name: "United States Grand Prix", venue: "Circuit of the Americas (Austin)", startDate: "2026-10-23", endDate: "2026-10-25" },
    { id: 20, name: "Mexico City Grand Prix", venue: "Autódromo Hermanos Rodríguez", startDate: "2026-10-30", endDate: "2026-11-01" },
    { id: 21, name: "São Paulo Grand Prix", venue: "Interlagos Circuit", startDate: "2026-11-06", endDate: "2026-11-08" },
    { id: 22, name: "Las Vegas Grand Prix", venue: "Las Vegas Strip Circuit", startDate: "2026-11-19", endDate: "2026-11-21" },
    { id: 23, name: "Qatar Grand Prix", venue: "Lusail International Circuit", startDate: "2026-11-27", endDate: "2026-11-29" },
    { id: 24, name: "Abu Dhabi Grand Prix", venue: "Yas Marina Circuit", startDate: "2026-12-04", endDate: "2026-12-06" },
];


const racesColumns : Column<Race>[] = [
    {
        name: "view",
        path: "id",
        action: Action.Edit,
    },
    { name: "Race", path: "name" },
    { name: "Venue", path: "venue" },
    { name: "Start", path: "startDate" },
    { name: "End", path: "endDate" },
];


export function RaceList() {
    const navigate = useNavigate();
    const { season } = useParams<{ season: string }>();

    function onClick(race: Race) {
        navigate(`/${season}/races/${race.id}`);
    }
    
    return (
        <DataTable<Race>
            data={racesData}
            columns={racesColumns}
            onEdit={onClick}
        />
    )
}