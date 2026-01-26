import { useParams } from "react-router";

const DEFAULT_SEASON = 2026;
const AVAILABLE_SEASONS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

/**
 * Hook to get the current season from URL params
 * @returns The current season as a number, or default season if not found/invalid
 */
export function useSeason(): number {
  const { season } = useParams<{ season?: string }>();
  
  if (!season) {
    return DEFAULT_SEASON;
  }
  
  const seasonNum = Number(season);
  
  // Validate season is a valid number and in available seasons
  if (isNaN(seasonNum) || !AVAILABLE_SEASONS.includes(seasonNum)) {
    return DEFAULT_SEASON;
  }
  
  return seasonNum;
}

/**
 * Get list of available seasons
 */
export function getAvailableSeasons(): number[] {
  return AVAILABLE_SEASONS;
}

/**
 * Get default season
 */
export function getDefaultSeason(): number {
  return DEFAULT_SEASON;
}