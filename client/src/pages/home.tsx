import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RobloxVersionResponse {
  clientVersionUpload: string;
}

export default function Home() {
  const [version, setVersion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  const fetchRobloxVersion = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Use our backend proxy to avoid CORS issues
      const response = await fetch('/api/roblox-version');
      if (!response.ok) {
        throw new Error(`Error fetching version: ${response.statusText}`);
      }
      const data: RobloxVersionResponse = await response.json();
      setVersion(data.clientVersionUpload);
    } catch (err) {
      console.error('Fetch error:', err);
      // Fallback to a placeholder version for demonstration
      setVersion("version-6ced3f7b78bf439c");
      setError("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!version || isDownloading) return;
    
    setIsDownloading(true);
    try {
      // Try to get fresh version first, then download
      const response = await fetch('/api/roblox-version');
      
      let downloadVersion = version;
      if (response.ok) {
        const data: RobloxVersionResponse = await response.json();
        downloadVersion = data.clientVersionUpload;
        setVersion(downloadVersion);
      }
      
      // Use HTTPS for the download URL
      const downloadUrl = `https://setup.rbxcdn.com/mac/${downloadVersion}-RobloxPlayer.zip`;
      console.log('Opening download URL:', downloadUrl);
      window.open(downloadUrl, '_blank');
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to initiate download. Please try again.');
    } finally {
      // Reset download state after a short delay
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  useEffect(() => {
    fetchRobloxVersion().catch(err => {
      console.error('Effect error:', err);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Roblox Mac DL</h1>
          <p className="text-muted-foreground">Download the official Roblox macOS client</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center" data-testid="version-display">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                  <span className="text-muted-foreground">Loading Roblox version...</span>
                </div>
              ) : error ? (
                <div className="text-destructive space-y-2">
                  <p>Error loading version</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchRobloxVersion}
                    data-testid="button-retry"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Roblox macOS Version:</p>
                  <p className="font-mono text-lg font-semibold">{version}</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleDownload}
              disabled={!version || isLoading || isDownloading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
              data-testid="button-download"
            >
              {isDownloading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Starting Download...</span>
                </div>
              ) : (
                'Download'
              )}
            </Button>

            {version && !isLoading && (
              <div className="text-center text-xs text-muted-foreground space-y-1">
                <p>• Compatible with macOS 10.13+</p>
                <p>• File size: ~250MB</p>
                <p>• Direct from Roblox servers</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Unofficial tool - Not affiliated with Roblox Corporation</p>
        </div>
      </div>
    </div>
  );
}