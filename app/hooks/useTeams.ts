import { useEffect, useState, useCallback } from "react";
import { fetchTeams, type Team } from "~/teams/teamList";

export function useTeams(season?: string) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchTeams(season);
            setTeams(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to load teams");
        } finally {
            setLoading(false);
        }
    }, [season]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        teams,
        loading,
        error,
        reload: load,
    };
}