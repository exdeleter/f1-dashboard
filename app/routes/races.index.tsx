import type { Route } from "./+types/races.index";
import { RaceList } from "~/races/races";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function RaceListRout() {
  return <RaceList />
}

