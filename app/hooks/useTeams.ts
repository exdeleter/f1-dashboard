import { useMemo } from "react";
import { useApi } from "~/hooks/useApi";
import { type Team } from "~/teams/teamList";

export function useTeams(season?: string) {
    const url = useMemo(() => {
        return season
            ? `team?season=${season}`
            : "team";
    }, [season]);

    const { data, loading, error, reload } = useApi<Team[]>({
        url
    });

    return {
        teams: data ?? [],
        loading,
        error,
        reload,
    };
}