import { 
  users, 
  userProfiles,
  templeGroups, 
  temples, 
  virtualTours, 
  transportOptions,
  itineraries,
  experiences,
  localFoods,
  restaurants,
  safetyTips,
  type User, 
  type InsertUser,
  type UserProfile,
  type InsertUserProfile,
  type TempleGroup,
  type Temple,
  type VirtualTour,
  type TransportOption,
  type Itinerary,
  type Experience,
  type LocalFood,
  type Restaurant,
  type SafetyTip
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined>;
  getUserByType(userType: string): Promise<User[]>;
  
  // User Profile operations
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: number, data: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  // Temple Group operations
  getAllTempleGroups(): Promise<TempleGroup[]>;
  getTempleGroupById(id: number): Promise<TempleGroup | undefined>;
  
  // Temple operations
  getAllTemples(): Promise<Temple[]>;
  getTempleById(id: number): Promise<Temple | undefined>;
  getTemplesByGroupId(groupId: number): Promise<Temple[]>;
  
  // Virtual Tour operations
  getAllVirtualTours(): Promise<VirtualTour[]>;
  getVirtualTourById(id: number): Promise<VirtualTour | undefined>;
  
  // Transport options operations
  getAllTransportOptions(): Promise<TransportOption[]>;
  getTransportOptionsByType(type: string): Promise<TransportOption[]>;
  getTransportOptionsByLocation(fromLocation: string): Promise<TransportOption[]>;
  getTransportOptionsByTypeAndLocation(type: string, fromLocation: string): Promise<TransportOption[]>;
  
  // Itinerary operations
  getAllItineraries(): Promise<Itinerary[]>;
  getItineraryById(id: number): Promise<Itinerary | undefined>;
  getItinerariesByPersona(targetPersona: string): Promise<Itinerary[]>;
  getItinerariesByDays(days: number): Promise<Itinerary[]>;
  getItinerariesByPersonaAndDays(targetPersona: string, days: number): Promise<Itinerary[]>;
  
  // Experience operations
  getAllExperiences(): Promise<Experience[]>;
  getExperienceById(id: number): Promise<Experience | undefined>;
  getExperiencesByCategory(category: string): Promise<Experience[]>;
  
  // Local food operations
  getAllLocalFoods(): Promise<LocalFood[]>;
  
  // Restaurant operations
  getAllRestaurants(): Promise<Restaurant[]>;
  
  // Safety tips operations
  getAllSafetyTips(): Promise<SafetyTip[]>;
  getSafetyTipsByCategory(category: string): Promise<SafetyTip[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProfiles: Map<number, UserProfile>;
  private templeGroups: Map<number, TempleGroup>;
  private temples: Map<number, Temple>;
  private virtualTours: Map<number, VirtualTour>;
  private transportOpts: Map<number, TransportOption>;
  private itineraries: Map<number, Itinerary>;
  private experiences: Map<number, Experience>;
  private localFoods: Map<number, LocalFood>;
  private restaurants: Map<number, Restaurant>;
  private safetyTips: Map<number, SafetyTip>;
  
  currentId: number;

  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.templeGroups = new Map();
    this.temples = new Map();
    this.virtualTours = new Map();
    this.transportOpts = new Map();
    this.itineraries = new Map();
    this.experiences = new Map();
    this.localFoods = new Map();
    this.restaurants = new Map();
    this.safetyTips = new Map();
    this.currentId = 1;
    
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add a default user for testing
    const defaultUser: User = {
      id: 1,
      username: "test",
      password: "test123",
      email: "test@example.com",
      fullName: "Test User",
      userType: "Complete Traveller",
      createdAt: new Date(),
      preferences: {}
    };
    this.users.set(1, defaultUser);

    // Add a default user profile
    const defaultProfile: UserProfile = {
      id: 1,
      userId: 1,
      interests: ["Temples", "History", "Architecture"],
      travelPreferences: {
        budget: "moderate",
        preferredTransport: "flight",
        accommodationType: "hotel"
      },
      visitHistory: [],
      savedItineraries: [],
      savedExperiences: [],
      lastLogin: new Date(),
      updatedAt: new Date()
    };
    this.userProfiles.set(1, defaultProfile);

    // Add sample temple groups
    const westernGroup: TempleGroup = {
      id: 1,
      name: "Western Group",
      description: "The largest and most important group of temples",
      overview: "Contains the most magnificent temples including Kandariya Mahadev",
      features: ["Largest collection", "Most well-preserved", "Main tourist attraction"],
      visitingInfo: {
        hours: "8:00 AM - 6:00 PM",
        entryFee: {
          indian: "₹40",
          foreigner: "₹600"
        }
      }
    };
    this.templeGroups.set(1, westernGroup);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const createdAt = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      userType: insertUser.userType || "Complete Traveller",
      preferences: insertUser.preferences || {}
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUserByType(userType: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.userType === userType,
    );
  }

  // User Profile methods
  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return this.userProfiles.get(userId);
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentId++;
    const newProfile: UserProfile = {
      ...profile,
      id,
      interests: profile.interests || [],
      travelPreferences: profile.travelPreferences || {},
      visitHistory: profile.visitHistory || [],
      savedItineraries: profile.savedItineraries || [],
      savedExperiences: profile.savedExperiences || [],
      lastLogin: profile.lastLogin || new Date(),
      updatedAt: new Date()
    };
    this.userProfiles.set(id, newProfile);
    return newProfile;
  }

  async updateUserProfile(userId: number, data: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const profile = this.userProfiles.get(userId);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...data, updatedAt: new Date() };
    this.userProfiles.set(userId, updatedProfile);
    return updatedProfile;
  }

  // Temple Group methods
  async getAllTempleGroups(): Promise<TempleGroup[]> {
    return Array.from(this.templeGroups.values());
  }

  async getTempleGroupById(id: number): Promise<TempleGroup | undefined> {
    return this.templeGroups.get(id);
  }

  // Temple methods
  async getAllTemples(): Promise<Temple[]> {
    return Array.from(this.temples.values());
  }

  async getTempleById(id: number): Promise<Temple | undefined> {
    return this.temples.get(id);
  }

  async getTemplesByGroupId(groupId: number): Promise<Temple[]> {
    return Array.from(this.temples.values()).filter(
      (temple) => temple.groupId === groupId,
    );
  }

  // Virtual Tour methods
  async getAllVirtualTours(): Promise<VirtualTour[]> {
    return Array.from(this.virtualTours.values());
  }

  async getVirtualTourById(id: number): Promise<VirtualTour | undefined> {
    return this.virtualTours.get(id);
  }

  // Transport Options methods
  async getAllTransportOptions(): Promise<TransportOption[]> {
    return Array.from(this.transportOpts.values());
  }

  async getTransportOptionsByType(type: string): Promise<TransportOption[]> {
    return Array.from(this.transportOpts.values()).filter(
      (option) => option.type === type,
    );
  }

  async getTransportOptionsByLocation(fromLocation: string): Promise<TransportOption[]> {
    return Array.from(this.transportOpts.values()).filter(
      (option) => option.fromLocation === fromLocation,
    );
  }

  async getTransportOptionsByTypeAndLocation(type: string, fromLocation: string): Promise<TransportOption[]> {
    return Array.from(this.transportOpts.values()).filter(
      (option) => option.type === type && option.fromLocation === fromLocation,
    );
  }

  // Itinerary methods
  async getAllItineraries(): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values());
  }

  async getItineraryById(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async getItinerariesByPersona(targetPersona: string): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => itinerary.targetPersona === targetPersona,
    );
  }

  async getItinerariesByDays(days: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => itinerary.days === days,
    );
  }

  async getItinerariesByPersonaAndDays(targetPersona: string, days: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => itinerary.targetPersona === targetPersona && itinerary.days === days,
    );
  }

  // Experience methods
  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getExperienceById(id: number): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async getExperiencesByCategory(category: string): Promise<Experience[]> {
    return Array.from(this.experiences.values()).filter(
      (experience) => experience.category === category,
    );
  }

  // Local Food methods
  async getAllLocalFoods(): Promise<LocalFood[]> {
    return Array.from(this.localFoods.values());
  }

  // Restaurant methods
  async getAllRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  // Safety Tips methods
  async getAllSafetyTips(): Promise<SafetyTip[]> {
    return Array.from(this.safetyTips.values());
  }

  async getSafetyTipsByCategory(category: string): Promise<SafetyTip[]> {
    return Array.from(this.safetyTips.values()).filter(
      (tip) => tip.category === category,
    );
  }
}

// Export a singleton instance
export const storage = new MemStorage();
