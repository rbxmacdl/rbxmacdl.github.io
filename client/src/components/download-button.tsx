import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DownloadButtonProps {
  version?: string;
  onError: (message: string) => void;
  disabled?: boolean;
}

export function DownloadButton({ version, onError, disabled }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    if (isDownloading || !version) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 200);

      // Open download URL
      const downloadUrl = `http://setup.rbxcdn.com/mac/${version}-RobloxPlayer.zip`;
      window.open(downloadUrl, '_blank');

      // Reset after 3 seconds
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 3000);

    } catch (error) {
      onError('Failed to initiate download. Please try again.');
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleDownload}
        disabled={disabled || isDownloading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 glow-effect download-progress flex items-center justify-center space-x-3"
        data-testid="button-download"
      >
        {isDownloading ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
            <span>Preparing Download...</span>
          </>
        ) : (
          <>
            <i className="fas fa-download text-lg"></i>
            <span>Download Now</span>
          </>
        )}
      </Button>

      {isDownloading && (
        <div className="bg-muted rounded-lg p-4" data-testid="download-progress">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Downloading...</span>
            <span className="text-sm text-muted-foreground">{Math.round(downloadProgress)}%</span>
          </div>
          <Progress value={downloadProgress} className="w-full" />
        </div>
      )}
    </div>
  );
}
