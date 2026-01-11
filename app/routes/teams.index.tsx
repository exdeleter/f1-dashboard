import type { Route } from "./+types/teams.index";
import { TeamList } from "~/teams/teamList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function TeamListRout() {
  return <TeamList />
}

