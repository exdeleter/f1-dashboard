import type { Route } from "./+types/reports";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reports - F1 Dashboard" },
    { name: "description", content: "Report Builder" },
  ];
}

export default function ReportsLayout() {
  return <Outlet />;
}

