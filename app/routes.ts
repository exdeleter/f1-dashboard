import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/layout.tsx", [
        index("routes/home.tsx"),
        route("teams", "routes/teams.tsx", [
            index("routes/teams.index.tsx"),
            route(":id", "routes/teams.$id.tsx"),
        ]),
        route("pilots", "routes/pilots.tsx", [
            index("routes/pilots.index.tsx"),
            route(":id", "routes/pilots.$id.tsx"),
        ]),
        route("races", "routes/races.tsx", [
            index("routes/races.index.tsx"),
            route(":id", "routes/races.$id.tsx"),
        ]),
        
    ])
] satisfies RouteConfig;