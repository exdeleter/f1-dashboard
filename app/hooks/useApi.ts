import { useCallback, useEffect, useState } from "react";

type UseApiOptions<T> = {
    url: string | (() => string);
    enabled?: boolean;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useApi<T>({ url, enabled = true }: UseApiOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(enabled);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const resolvedUrl = typeof url === "function" ? url() : url;

            const res = await fetch(`${API_BASE_URL}/${resolvedUrl}`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const json = (await res.json()) as T;
            setData(json);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to load data");
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        if (enabled) {
            load();
        }
    }, [load, enabled]);

    return {
        data,
        loading,
        error,
        reload: load,
    };
}