import { useQuery } from "@tanstack/react-query";

interface RobloxVersionResponse {
  clientVersionUpload: string;
}

async function fetchRobloxVersion(): Promise<string> {
  // Use a reliable CORS proxy for GitHub Pages deployment
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  const targetUrl = 'https://clientsettingscdn.roblox.com/v2/client-version/MacPlayer';
  
  try {
    const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch version: ${response.statusText}`);
    }
    
    const proxyData = await response.json();
    const data: RobloxVersionResponse = JSON.parse(proxyData.contents);
    return data.clientVersionUpload;
  } catch (error) {
    // Fallback to a recent known version if CORS proxy fails
    console.warn('Failed to fetch latest version, using fallback:', error);
    return 'version-6ced3f7b78bf439c';
  }
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
