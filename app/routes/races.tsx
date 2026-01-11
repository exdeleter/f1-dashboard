import type { Route } from "./+types/races";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function RacesLayout() {
  return <Outlet />
}