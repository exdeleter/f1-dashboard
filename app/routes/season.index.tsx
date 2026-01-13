import type { Route } from "./+types/season.index";
import { Welcome } from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard - Season" },
    { name: "description", content: "Formula 1 Season Overview" },
  ];
}

export default function SeasonHome() {
  return <Welcome />;
}

