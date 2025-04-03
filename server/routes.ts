import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTempleGroupSchema, 
  insertTempleSchema, 
  insertVirtualTourSchema,
  insertTransportOptionSchema,
  insertItinerarySchema,
  insertExperienceSchema,
  insertLocalFoodSchema,
  insertRestaurantSchema,
  insertSafetyTipSchema,
  insertUserSchema,
  insertUserProfileSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const parseResult = insertUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid user data", errors: parseResult.error.errors });
      }
      
      const existingUser = await storage.getUserByUsername(parseResult.data.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(parseResult.data);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  app.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const updatedUser = await storage.updateUser(id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  
  app.get("/api/users/by-type/:userType", async (req, res) => {
    try {
      const userType = req.params.userType;
      const users = await storage.getUserByType(userType);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users by type" });
    }
  });
  
  // User Profile routes
  app.post("/api/user-profiles", async (req, res) => {
    try {
      const parseResult = insertUserProfileSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid profile data", errors: parseResult.error.errors });
      }
      
      const user = await storage.getUser(parseResult.data.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const existingProfile = await storage.getUserProfile(parseResult.data.userId);
      if (existingProfile) {
        return res.status(409).json({ message: "Profile already exists for this user" });
      }
      
      // Fill in required but optional from client fields
      const profile = await storage.createUserProfile({
        ...parseResult.data,
        interests: parseResult.data.interests || [],
        travelPreferences: parseResult.data.travelPreferences || {},
        visitHistory: parseResult.data.visitHistory || [],
        savedItineraries: parseResult.data.savedItineraries || [],
        savedExperiences: parseResult.data.savedExperiences || [],
        lastLogin: parseResult.data.lastLogin || new Date(),
        updatedAt: new Date()
      });
      
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user profile" });
    }
  });
  
  app.get("/api/user-profiles/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });
  
  app.patch("/api/user-profiles/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      
      const updatedProfile = await storage.updateUserProfile(userId, req.body);
      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user profile" });
    }
  });
  
  // Temple Groups
  app.get("/api/temple-groups", async (req, res) => {
    try {
      const templeGroups = await storage.getAllTempleGroups();
      res.json(templeGroups);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch temple groups" });
    }
  });

  app.get("/api/temple-groups/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const templeGroup = await storage.getTempleGroupById(id);
      
      if (!templeGroup) {
        return res.status(404).json({ message: "Temple group not found" });
      }
      
      res.json(templeGroup);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch temple group" });
    }
  });

  // Temples
  app.get("/api/temples", async (req, res) => {
    try {
      const groupId = req.query.groupId ? parseInt(req.query.groupId as string) : undefined;
      const temples = groupId 
        ? await storage.getTemplesByGroupId(groupId)
        : await storage.getAllTemples();
      res.json(temples);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch temples" });
    }
  });

  app.get("/api/temples/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const temple = await storage.getTempleById(id);
      
      if (!temple) {
        return res.status(404).json({ message: "Temple not found" });
      }
      
      res.json(temple);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch temple" });
    }
  });

  // Virtual Tours
  app.get("/api/virtual-tours", async (req, res) => {
    try {
      const virtualTours = await storage.getAllVirtualTours();
      res.json(virtualTours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch virtual tours" });
    }
  });

  app.get("/api/virtual-tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const virtualTour = await storage.getVirtualTourById(id);
      
      if (!virtualTour) {
        return res.status(404).json({ message: "Virtual tour not found" });
      }
      
      res.json(virtualTour);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch virtual tour" });
    }
  });

  // Transport Options
  app.get("/api/transport-options", async (req, res) => {
    try {
      const type = req.query.type as string | undefined;
      const fromLocation = req.query.fromLocation as string | undefined;
      
      let transportOptions;
      if (type && fromLocation) {
        transportOptions = await storage.getTransportOptionsByTypeAndLocation(type, fromLocation);
      } else if (type) {
        transportOptions = await storage.getTransportOptionsByType(type);
      } else if (fromLocation) {
        transportOptions = await storage.getTransportOptionsByLocation(fromLocation);
      } else {
        transportOptions = await storage.getAllTransportOptions();
      }
      
      res.json(transportOptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transport options" });
    }
  });

  // Itineraries
  app.get("/api/itineraries", async (req, res) => {
    try {
      const targetPersona = req.query.targetPersona as string | undefined;
      const days = req.query.days ? parseInt(req.query.days as string) : undefined;
      
      let itineraries;
      if (targetPersona && days) {
        itineraries = await storage.getItinerariesByPersonaAndDays(targetPersona, days);
      } else if (targetPersona) {
        itineraries = await storage.getItinerariesByPersona(targetPersona);
      } else if (days) {
        itineraries = await storage.getItinerariesByDays(days);
      } else {
        itineraries = await storage.getAllItineraries();
      }
      
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itineraries" });
    }
  });

  app.get("/api/itineraries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itinerary = await storage.getItineraryById(id);
      
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      
      res.json(itinerary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itinerary" });
    }
  });

  // Experiences
  app.get("/api/experiences", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      const experiences = category 
        ? await storage.getExperiencesByCategory(category)
        : await storage.getAllExperiences();
      
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.get("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const experience = await storage.getExperienceById(id);
      
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      
      res.json(experience);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experience" });
    }
  });

  // Local Foods
  app.get("/api/local-foods", async (req, res) => {
    try {
      const localFoods = await storage.getAllLocalFoods();
      res.json(localFoods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch local foods" });
    }
  });

  // Restaurants
  app.get("/api/restaurants", async (req, res) => {
    try {
      const restaurants = await storage.getAllRestaurants();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch restaurants" });
    }
  });

  // Safety Tips
  app.get("/api/safety-tips", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      const safetyTips = category 
        ? await storage.getSafetyTipsByCategory(category)
        : await storage.getAllSafetyTips();
      
      res.json(safetyTips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch safety tips" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
