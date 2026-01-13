import type { Route } from "./+types/season";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Formula 1 Season Dashboard" },
  ];
}

export default function SeasonLayout() {
  return <Outlet />;
}

