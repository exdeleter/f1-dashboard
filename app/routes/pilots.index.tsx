import type { Route } from "./+types/pilots.index";
import { PilotList } from "~/pilots/pilotList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function PilotListRout() {
  return <PilotList />
}

