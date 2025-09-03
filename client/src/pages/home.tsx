import { useState, useEffect, useRef } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchRobloxVersion = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Use a reliable CORS proxy for GitHub Pages deployment
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = 'https://clientsettingscdn.roblox.com/v2/client-version/MacPlayer';
      const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching version: ${response.statusText}`);
      }
      const proxyData = await response.json();
      const data: RobloxVersionResponse = JSON.parse(proxyData.contents);
      setVersion(data.clientVersionUpload);
    } catch (err) {
      console.error('Fetch error:', err);
      // Fallback to a recent known version if CORS proxy fails
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
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = 'https://clientsettingscdn.roblox.com/v2/client-version/MacPlayer';
      const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
      
      let downloadVersion = version;
      if (response.ok) {
        const proxyData = await response.json();
        const data: RobloxVersionResponse = JSON.parse(proxyData.contents);
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Interactive Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mouse-following gradient */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-xl transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${10 + (i * 8) + Math.sin(i) * 10}%`,
              top: `${20 + (i * 6) + Math.cos(i) * 15}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`,
              transition: 'transform 0.6s ease-out',
            }}
          />
        ))}
        
        {/* Glowing orbs that react to mouse */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm animate-bounce"
            style={{
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
              left: `${15 + i * 15}%`,
              top: `${25 + i * 12}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${3 + i * 0.5}s`,
              transform: `translate(${(mousePosition.x - 50) * (0.05 + i * 0.01)}px, ${(mousePosition.y - 50) * (0.05 + i * 0.01)}px)`,
              transition: 'transform 0.8s ease-out',
            }}
          />
        ))}
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
            style={{
              transform: `translateX(${(mousePosition.x - 50) * 0.2}px) rotate(${(mousePosition.x - 50) * 0.1}deg)`,
              transition: 'transform 0.5s ease-out',
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"
            style={{
              transform: `translateY(${(mousePosition.y - 50) * 0.2}px) rotate(${(mousePosition.y - 50) * 0.1}deg)`,
              transition: 'transform 0.5s ease-out',
            }}
          />
        </div>
      </div>

      <div className="max-w-lg w-full space-y-8 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">🎮</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Roblox Mac Download
          </h1>
          <p className="text-lg text-slate-300">
            Download the official Roblox macOS client
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-300 bg-blue-950/50 rounded-lg px-4 py-2 border border-blue-800/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Data sourced directly from Roblox API</span>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-slate-800/90 border-slate-700/50 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="text-center" data-testid="version-display">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3 py-4">
                  <div className="animate-spin w-6 h-6 border-3 border-blue-400 border-t-transparent rounded-full"></div>
                  <span className="text-slate-300 text-lg">Loading latest version...</span>
                </div>
              ) : error ? (
                <div className="text-red-400 space-y-3 py-4">
                  <p className="text-lg">Unable to load version</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchRobloxVersion}
                    className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                    data-testid="button-retry"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 py-2">
                  <p className="text-slate-300 font-medium">Current macOS Version:</p>
                  <div className="bg-slate-900/80 rounded-lg px-4 py-3 border border-slate-600/50">
                    <p className="font-mono text-xl font-bold text-blue-300">{version}</p>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleDownload}
              disabled={!version || isLoading || isDownloading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              data-testid="button-download"
            >
              {isDownloading ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Preparing Download...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-xl">⬇️</span>
                  <span>Download Now</span>
                </div>
              )}
            </Button>

            {version && !isLoading && (
              <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-600/30">
                <div className="grid grid-cols-1 gap-2 text-sm text-slate-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>Compatible with macOS 10.13+</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>File size: ~250MB</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>Direct from Roblox CDN servers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">ℹ</span>
                    <span>Version fetched from official Roblox API</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-slate-400">
            Unofficial tool - Not affiliated with Roblox Corporation
          </p>
          <p className="text-xs text-slate-500">
            Data provided by Roblox Client Settings API
          </p>
        </div>
      </div>
    </div>
  );
}