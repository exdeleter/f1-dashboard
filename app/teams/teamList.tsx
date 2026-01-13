import {type Column, DataTable, Action} from "~/../app/components/table/table";
import { useNavigate, useParams } from "react-router";
import "./teamListStyle.css";

const data: Team[] = [
    {
        id: 1,
        name: "McLaren",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/McLaren_Racing_logo.svg/2560px-McLaren_Racing_logo.svg.png",
        founded: 1963 // команда основана Брюсом Маклареном в 1963 году; дебют в F1 — 1966 год :contentReference[oaicite:1]{index=1}
    },
    {
        id: 2,
        name: "Mercedes",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Mercedes-Benz_in_Formula_One_logo.svg/2560px-Mercedes-Benz_in_Formula_One_logo.svg.png",
        founded: 1954 // команда Mercedes F1 ведёт историю с 1954 года (до 1955 и с 2010 по настоящее время) :contentReference[oaicite:2]{index=2}
    },
    {
        id: 3,
        name: "Red Bull Racing",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_bull_racing.png",
        founded: 2005 // Red Bull Racing появилась в 2005 году после покупки команды Jaguar F1 :contentReference[oaicite:3]{index=3}
    },
    {
        id: 4,
        name: "Ferrari",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Scuderia_Ferrari_HP_logo_24.svg/2560px-Scuderia_Ferrari_HP_logo_24.svg.png",
        founded: 1950 // Scuderia Ferrari участвует в чемпионате с 1950 года — с начала чемпионата мира :contentReference[oaicite:4]{index=4}
    },
    {
        id: 5,
        name: "Williams",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Williams_F1_logo_2026_%28Corrigindo%29.png",
        founded: 1977 // команда основана Фрэнком Уильямсом и Патриком Хэдом в 1977 году :contentReference[oaicite:5]{index=5}
    },
    {
        id: 6,
        name: "Alpine",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Logo_of_alpine_f1_team_2022.png",
        founded: 2021 // современная команда Alpine выступает с 2021 года (преемник Renault F1) :contentReference[oaicite:6]{index=6}
    },
    {
        id: 7,
        name: "Aston Martin",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/15/Aston_Martin_Aramco_2024_logo.png",
        founded: 1959 // оригинальная история команды начинается с выступлений старых предшественников (Force India и т.п.), но ныне в F1 с 2021 года :contentReference[oaicite:7]{index=7}
    },
    {
        id: 8,
        name: "Haas",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/MoneyGram_Haas_F1_Team_Logo.svg/2560px-MoneyGram_Haas_F1_Team_Logo.svg.png",
        founded: 2016 // Haas F1 Team дебютировала в 2016 году :contentReference[oaicite:8]{index=8}
    },
    {
        id: 9,
        name: "Racing Bulls",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/VCARB_F1_logo.svg/2560px-VCARB_F1_logo.svg.png",
        founded: 1985 // команда ведёт историю с Minardi (1985), позже Toro Rosso/AlphaTauri, в 2025 году выступает как Racing Bulls :contentReference[oaicite:9]{index=9}
    },
    {
        id: 10,
        name: "Kick Sauber",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/2023_Stake_F1_Team_Kick_Sauber_logo.png",
        founded: 1993 // Sauber впервые появился в Формуле‑1 в 1993 году :contentReference[oaicite:10]{index=10}
    }
];

type Team = {
    id: number;
    name: string;
    logo: string;
    founded: number;
};

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
        name: "Founded",
        path: "founded",
    },
    {
        name: "Logo",
        path: "logo",
        render: (value) => (
            <img src={value as string} alt="logo" width={40} />
        ),
    },
];



export function TeamList() {
    const navigate = useNavigate();
    const { season } = useParams<{ season: string }>();

    function onClick(team: Team) {
        navigate(`/${season}/teams/${team.id}`);
    }

    function onClickNew() {
        navigate(`/${season}/teams/0`);
    }
    
    return (
        <>
            <div className="toolbar">
                <button className="custom-button" onClick={onClickNew}>Create</button>
            </div>
            
            <DataTable<Team> data={data} columns={columns} onEdit={onClick} />
        </>
    );
}