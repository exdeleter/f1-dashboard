import type { Route } from "./+types/home";
import { RaceView } from "~/races/race";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Race() {
  return <RaceView />
}