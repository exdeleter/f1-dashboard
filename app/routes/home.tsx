import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard - Home" },
    { name: "description", content: "Formula 1 Championship Dashboard" },
  ];
}

export default function Home() {
  return <Welcome />;
}
