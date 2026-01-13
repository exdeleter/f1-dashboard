import type { Route } from "./+types/home";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard - Home" },
    { name: "description", content: "Formula 1 Championship Dashboard" },
  ];
}

export default function Home() {
  return <Navigate to="/2026" replace />;
}
