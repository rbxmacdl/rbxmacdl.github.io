import { useQuery } from "@tanstack/react-query";

interface RobloxVersionResponse {
  clientVersionUpload: string;
}

async function fetchRobloxVersion(): Promise<string> {
  const response = await fetch('https://clientsettingscdn.roblox.com/v2/client-version/MacPlayer');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch version: ${response.statusText}`);
  }
  
  const data: RobloxVersionResponse = await response.json();
  return data.clientVersionUpload;
}

export function useRobloxVersion() {
  return useQuery({
    queryKey: ['roblox-version'],
    queryFn: fetchRobloxVersion,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
