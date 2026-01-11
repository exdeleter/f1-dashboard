import type { Route } from "./+types/pilots.$id";
import { PilotView } from "~/pilots/pilot";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "F1 Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Pilots() {
  return <PilotView />
}