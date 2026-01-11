import type { Route } from "./+types/teams";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function TeamsLayout() {
  return <Outlet />
}