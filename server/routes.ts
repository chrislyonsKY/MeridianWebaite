import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Set up authentication before other routes
  await setupAuth(app);
  registerAuthRoutes(app);

  app.get(api.stories.list.path, async (req, res) => {
    try {
      const topic = req.query.topic as string | undefined;
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      const result = await storage.getStories(page, limit, topic);
      res.json(result);
    } catch (err) {
      console.error("Error fetching stories:", err);
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  app.get(api.stories.get.path, async (req, res) => {
    try {
      const story = await storage.getStory(Number(req.params.id));
      if (!story) {
        return res.status(404).json({ message: 'Story not found' });
      }
      res.json(story);
    } catch (err) {
      console.error("Error fetching story:", err);
      res.status(500).json({ message: "Failed to fetch story" });
    }
  });

  app.get(api.sources.list.path, async (req, res) => {
    try {
      const sourcesList = await storage.getSources();
      res.json(sourcesList);
    } catch (err) {
      console.error("Error fetching sources:", err);
      res.status(500).json({ message: "Failed to fetch sources" });
    }
  });

  app.post(api.pipeline.trigger.path, async (req, res) => {
    // In a real app, this would trigger the actual pipeline using OpenAI
    // For now we just return success
    try {
      res.json({ message: "Pipeline triggered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to trigger pipeline" });
    }
  });

  // Seed data if empty
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const sources = await storage.getSources();
  if (sources.length > 0) return;

  // Insert Sources
  const nyt = await storage.createSource({
    name: "The New York Times",
    url: "https://nytimes.com",
    biasRating: "center-left",
    isActive: true,
  });

  const wsj = await storage.createSource({
    name: "The Wall Street Journal",
    url: "https://wsj.com",
    biasRating: "center-right",
    isActive: true,
  });

  const ap = await storage.createSource({
    name: "Associated Press",
    url: "https://apnews.com",
    biasRating: "center",
    isActive: true,
  });

  const fox = await storage.createSource({
    name: "Fox News",
    url: "https://foxnews.com",
    biasRating: "right",
    isActive: true,
  });

  const npr = await storage.createSource({
    name: "NPR",
    url: "https://npr.org",
    biasRating: "center-left",
    isActive: true,
  });

  // Insert Articles for Story 1
  const article1a = await storage.createArticle({
    sourceId: nyt.id,
    title: "Federal Reserve Signals Potential Rate Cuts Later This Year",
    url: "https://nytimes.com/fed-rates-1",
    snippet: "The central bank held rates steady but indicated that inflation is moving closer to its 2% target.",
    publishedAt: new Date(),
  });

  const article1b = await storage.createArticle({
    sourceId: wsj.id,
    title: "Fed Leaves Rates Unchanged, Cites Strong Economic Growth",
    url: "https://wsj.com/fed-rates-2",
    snippet: "Policymakers maintain current interest rates as they balance inflation concerns with a surprisingly resilient labor market.",
    publishedAt: new Date(),
  });

  const article1c = await storage.createArticle({
    sourceId: fox.id,
    title: "Consumers Continue to Suffer as Fed Delays Rate Relief",
    url: "https://foxnews.com/fed-rates-3",
    snippet: "Another meeting passes with no relief for American families struggling with high borrowing costs.",
    publishedAt: new Date(),
  });

  // Create Story 1
  const story1 = await storage.createStory({
    headline: "Federal Reserve Maintains Current Interest Rates, Hints at Future Cuts",
    summary: "The Federal Reserve concluded its latest policy meeting by leaving benchmark interest rates unchanged at 5.25%-5.5%. Chairman Jerome Powell noted that while inflation has eased from its peak, the central bank needs more confidence that it is moving sustainably toward their 2% target before initiating cuts. The announcement met market expectations.",
    topic: "business",
    keyFacts: [
      "Interest rates remain at a 23-year high of 5.25%-5.5%.",
      "This is the fifth consecutive meeting without a rate change.",
      "The Fed's inflation target remains at 2%."
    ],
    divergenceSummary: "Coverage diverges primarily on the framing of the delay. Left-leaning and centrist outlets emphasize the cautious optimism regarding cooling inflation and strong economic fundamentals. Right-leaning outlets focus heavily on the continued financial burden high rates place on average consumers.",
    status: "published",
    publishedAt: new Date(),
  });

  await storage.linkArticleToStory(story1.id, article1a.id, "Emphasized the Fed's acknowledgment that inflation is cooling and moving in the right direction.");
  await storage.linkArticleToStory(story1.id, article1b.id, "Focused on the robust labor market data giving the Fed runway to wait.");
  await storage.linkArticleToStory(story1.id, article1c.id, "Framed the decision as an ongoing failure to provide relief to consumers struggling with debt.");

  // Insert Articles for Story 2
  const article2a = await storage.createArticle({
    sourceId: ap.id,
    title: "SpaceX Successfully Launches Next Generation Communication Satellite",
    url: "https://apnews.com/spacex-launch",
    snippet: "A Falcon 9 rocket successfully delivered a new commercial payload to orbit before completing a landing at sea.",
    publishedAt: new Date(Date.now() - 86400000), // Yesterday
  });

  const article2b = await storage.createArticle({
    sourceId: npr.id,
    title: "Latest SpaceX Launch Adds to Growing Low Earth Orbit Congestion",
    url: "https://npr.org/spacex-congestion",
    snippet: "While technically successful, astronomers again raise concerns about the increasing number of commercial satellites disrupting observations.",
    publishedAt: new Date(Date.now() - 86400000), // Yesterday
  });

  // Create Story 2
  const story2 = await storage.createStory({
    headline: "SpaceX Completes Falcon 9 Launch of Commercial Satellite",
    summary: "SpaceX successfully launched a Falcon 9 rocket from Cape Canaveral, delivering a next-generation communications satellite into low Earth orbit. The first stage booster successfully landed on a drone ship in the Atlantic Ocean minutes after liftoff. This marks the company's 30th launch of the year.",
    topic: "technology",
    keyFacts: [
      "Launch occurred at Cape Canaveral Space Force Station.",
      "Payload was a commercial communications satellite.",
      "The first stage booster was successfully recovered."
    ],
    divergenceSummary: "Most outlets covered the launch as a routine technical success. However, coverage from public media outlets prominently featured concerns from the scientific community regarding light pollution and orbital debris caused by the increasing frequency of commercial launches.",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000),
  });

  await storage.linkArticleToStory(story2.id, article2a.id, "Reported the launch as a straightforward technical success.");
  await storage.linkArticleToStory(story2.id, article2b.id, "Dedicated the majority of the article to the environmental and astronomical impacts of the launch.");
}
