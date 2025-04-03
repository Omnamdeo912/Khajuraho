import { pgTable, text, serial, integer, boolean, json, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for user accounts
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Temple groups (Western, Eastern, Southern)
export const templeGroups = pgTable("temple_groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  overview: text("overview").notNull(),
  features: json("features").notNull(), // Array of feature strings
  visitingInfo: json("visiting_info").notNull(), // Object with hours, fees, etc.
});

// Temples details
export const temples = pgTable("temples", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  groupId: integer("group_id").notNull(), // Foreign key to temple_groups
  image: text("image").notNull(), // Reference to an image URL
  history: text("history"),
  architecture: text("architecture"),
  significance: text("significance"),
});

// Virtual tours available
export const virtualTours = pgTable("virtual_tours", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  image: text("image").notNull(),
  tourData: json("tour_data").notNull(), // Contains points of interest, annotations
  description: text("description"),
});

// Transportation options (flights, trains, etc.)
export const transportOptions = pgTable("transport_options", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "air", "train", "road"
  fromLocation: text("from_location").notNull(),
  details: json("details").notNull(), // Contains duration, cost, frequency
  description: text("description"),
});

// Curated itineraries
export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  days: integer("days").notNull(),
  targetPersona: text("target_persona").notNull(), // "heritage-explorer", "holistic-experience"
  description: text("description").notNull(),
  image: text("image").notNull(),
  timeline: json("timeline").notNull(), // Array of day-by-day activities
});

// Experiences beyond temple visits
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "heritage", "culture", "wildlife", etc.
  image: text("image").notNull(),
  duration: text("duration").notNull(),
  price: text("price").notNull(),
});

// Local food and cuisine options
export const localFoods = pgTable("local_foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tag: text("tag"), // "Must try!", "Local favorite", etc.
});

// Local restaurants
export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  cuisine: text("cuisine").notNull(),
  priceRange: text("price_range").notNull(), // "₹", "₹₹", "₹₹₹"
  rating: integer("rating").notNull(),
  reviews: integer("reviews").notNull(),
});

// Safety tips and information
export const safetyTips = pgTable("safety_tips", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // "women", "seasonal", "general"
  tips: json("tips").notNull(), // Array of tip strings
});

// Define insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
});

export const insertTempleGroupSchema = createInsertSchema(templeGroups);
export const insertTempleSchema = createInsertSchema(temples);
export const insertVirtualTourSchema = createInsertSchema(virtualTours);
export const insertTransportOptionSchema = createInsertSchema(transportOptions);
export const insertItinerarySchema = createInsertSchema(itineraries);
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertLocalFoodSchema = createInsertSchema(localFoods);
export const insertRestaurantSchema = createInsertSchema(restaurants);
export const insertSafetyTipSchema = createInsertSchema(safetyTips);

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTempleGroup = z.infer<typeof insertTempleGroupSchema>;
export type TempleGroup = typeof templeGroups.$inferSelect;

export type InsertTemple = z.infer<typeof insertTempleSchema>;
export type Temple = typeof temples.$inferSelect;

export type InsertVirtualTour = z.infer<typeof insertVirtualTourSchema>;
export type VirtualTour = typeof virtualTours.$inferSelect;

export type InsertTransportOption = z.infer<typeof insertTransportOptionSchema>;
export type TransportOption = typeof transportOptions.$inferSelect;

export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

export type InsertLocalFood = z.infer<typeof insertLocalFoodSchema>;
export type LocalFood = typeof localFoods.$inferSelect;

export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type Restaurant = typeof restaurants.$inferSelect;

export type InsertSafetyTip = z.infer<typeof insertSafetyTipSchema>;
export type SafetyTip = typeof safetyTips.$inferSelect;
