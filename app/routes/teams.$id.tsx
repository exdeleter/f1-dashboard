import type { Route } from "./+types/teams.$id";
import { TeamView } from "~/teams/team";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function TeamViewRout() {
  return <TeamView />
}