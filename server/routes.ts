import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy endpoint for Roblox version API to avoid CORS issues
  app.get("/api/roblox-version", async (req, res) => {
    try {
      const response = await fetch('https://clientsettingscdn.roblox.com/v2/client-version/MacPlayer');
      
      if (!response.ok) {
        throw new Error(`Roblox API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching Roblox version:', error);
      res.status(500).json({ 
        error: 'Failed to fetch Roblox version',
        fallback: { clientVersionUpload: "version-6ced3f7b78bf439c" }
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
