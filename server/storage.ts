import { 
  users, 
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
    
    // Initialize with some sample data
    this.initializeData();
  }
  
  private initializeData() {
    // Temple Groups
    const westernGroup: TempleGroup = {
      id: 1,
      name: "Western Group",
      description: "The Western Group of temples is the largest and most important group at Khajuraho, containing the most magnificent temples.",
      overview: "The Western Group contains the largest collection of temples in the Khajuraho complex and features the most impressive architectural examples.",
      features: [
        "Contains the largest temple, Kandariya Mahadev",
        "Most well-preserved collection",
        "Features stunning architectural innovations",
        "Main tourist attraction with light & sound show"
      ],
      visitingInfo: {
        hours: "Open daily from 8:00 AM to 6:00 PM",
        entryFee: {
          indian: "₹40",
          foreigner: "₹600"
        },
        lightShow: "6:30 PM (English), 7:40 PM (Hindi)"
      }
    };
    
    const easternGroup: TempleGroup = {
      id: 2,
      name: "Eastern Group",
      description: "The Eastern Group consists primarily of Jain temples, showcasing a different architectural style compared to Hindu temples.",
      overview: "The Eastern Group houses many Jain temples and has a more secluded, peaceful atmosphere.",
      features: [
        "Features prominent Jain temples",
        "Less crowded than Western Group",
        "Showcases distinct Jain iconography",
        "Includes Hindu temples like Brahma and Vamana"
      ],
      visitingInfo: {
        hours: "Open daily from 8:00 AM to 6:00 PM",
        entryFee: {
          indian: "₹40",
          foreigner: "₹600"
        },
        distance: "About 1 km from the Western Group"
      }
    };
    
    const southernGroup: TempleGroup = {
      id: 3,
      name: "Southern Group",
      description: "The Southern Group is more remote and includes some of the later-period temples that showcase evolving architectural styles.",
      overview: "Located away from the main complex, these temples offer a more private experience with fewer visitors.",
      features: [
        "More secluded and serene atmosphere",
        "Fewer tourists visit this area",
        "Located about 5 km from main complex",
        "Shows evolution of temple architecture"
      ],
      visitingInfo: {
        hours: "Open daily from 8:00 AM to 6:00 PM",
        entryFee: {
          indian: "₹40",
          foreigner: "₹600"
        },
        transport: "Taxi ride required from main complex"
      }
    };
    
    this.templeGroups.set(1, westernGroup);
    this.templeGroups.set(2, easternGroup);
    this.templeGroups.set(3, southernGroup);
    
    // Temples
    const temples: Temple[] = [
      {
        id: 1,
        name: "Kandariya Mahadev Temple",
        description: "The largest and most ornate temple at Khajuraho, dedicated to Lord Shiva.",
        groupId: 1,
        image: "temple-exterior-2",
        history: "Built during the reign of King Vidyadhara between 1017-1029 CE, this temple represents the pinnacle of Chandela architecture.",
        architecture: "Standing 31 meters tall, the temple has an elaborate spire and intricate sculptures covering its exterior.",
        significance: "Dedicated to Lord Shiva, it contains one of the most important Shiva lingams in the region."
      },
      {
        id: 2,
        name: "Lakshmana Temple",
        description: "One of the best preserved temples dedicated to Lord Vishnu.",
        groupId: 1,
        image: "temple-exterior-3",
        history: "Completed around 954 CE by Chandela king Yashovarman, it is one of the earliest temples in Khajuraho.",
        architecture: "Notable for its platform with friezes of elephants and warriors, and its beautifully balanced proportions.",
        significance: "Houses a three-headed image of Vishnu's incarnations."
      },
      {
        id: 3,
        name: "Chitragupta Temple",
        description: "Rare temple dedicated to Surya (Sun God) with eastward orientation.",
        groupId: 1,
        image: "temple-exterior-4",
        history: "Built around 1000-1025 CE during the reign of King Vidyadhara.",
        architecture: "Unusual east-facing orientation to allow the first rays of the sun to fall on the deity.",
        significance: "One of the few temples dedicated to Surya in the region."
      },
      {
        id: 4,
        name: "Vishvanatha Temple",
        description: "Dedicated to Lord Shiva with a large Nandi statue facing the shrine.",
        groupId: 1,
        image: "temple-exterior-5",
        history: "Constructed around 1002 CE under the patronage of King Dhanga.",
        architecture: "Three-part design with an entrance, hall, and sanctum, typical of mature Khajuraho style.",
        significance: "Features the iconic Nandi bull facing the sanctum as Shiva's mount."
      },
      {
        id: 5,
        name: "Parsvanath Temple",
        description: "The largest Jain temple at Khajuraho with exquisite sculptures.",
        groupId: 2,
        image: "temple-exterior-6",
        history: "Built in the 10th century, it was originally dedicated to Adinath but later rededicated to Parsvanath.",
        architecture: "Distinctive Jain architectural elements with less emphasis on erotic sculptures.",
        significance: "Largest and most complete Jain temple in Khajuraho."
      },
      {
        id: 6,
        name: "Adinath Temple",
        description: "Dedicated to the first Jain Tirthankara, with intricate carvings.",
        groupId: 2,
        image: "temple-exterior-7",
        history: "Constructed in the late 11th century as Jainism gained prominence in the region.",
        architecture: "Simpler than Hindu temples but with equally fine sculptural detail.",
        significance: "Houses images of various Jain Tirthankaras and celestial beings."
      },
      {
        id: 7,
        name: "Duladeo Temple",
        description: "A Shiva temple known for its elegant sculptures of celestial beauties.",
        groupId: 3,
        image: "temple-exterior-8",
        history: "Built in the late 11th or early 12th century, marking the last phase of Chandela architecture.",
        architecture: "Shows evolution with simpler lines and less ornate exterior compared to earlier temples.",
        significance: "Named after the 'bridegroom deity' form of Shiva."
      },
      {
        id: 8,
        name: "Chaturbhuj Temple",
        description: "Known for its massive carved image of Vishnu in the sanctum.",
        groupId: 3,
        image: "temple-exterior-5",
        history: "Constructed around the early 12th century as Chandela power was beginning to decline.",
        architecture: "Unusual rectangular sanctum and tall shikara (spire).",
        significance: "Name refers to the four-armed (Chaturbhuj) form of Vishnu."
      }
    ];
    
    temples.forEach(temple => {
      this.temples.set(temple.id, temple);
    });
    
    // Virtual Tours
    const virtualTours: VirtualTour[] = [
      {
        id: 1,
        name: "Kandariya Mahadev",
        location: "Exterior & Inner Sanctum",
        image: "temple-sculpture-1",
        tourData: {
          panoramas: [
            { position: "main-entrance", label: "Main Entrance" },
            { position: "mandapa", label: "Mandapa (Hall)" },
            { position: "inner-sanctum", label: "Inner Sanctum" }
          ],
          annotations: [
            { point: { x: 0.3, y: 0.4 }, text: "This is the main hall of Kandariya Mahadev Temple, showcasing intricate ceiling carvings that depict celestial beings and floral motifs." },
            { point: { x: 0.6, y: 0.2 }, text: "Notice the detailed sculptures of divine couples (mithunas) that represent cosmic harmony." }
          ]
        },
        description: "Experience the grandeur of Khajuraho's largest temple with stunning architectural details."
      },
      {
        id: 2,
        name: "Lakshmana Temple",
        location: "Sculpture Gallery",
        image: "temple-sculpture-7",
        tourData: {
          panoramas: [
            { position: "platform", label: "Platform with Friezes" },
            { position: "exterior-walls", label: "Exterior Walls" },
            { position: "sanctum", label: "Sanctum" }
          ],
          annotations: [
            { point: { x: 0.4, y: 0.5 }, text: "The platform base features intricate elephant sculptures, symbolizing strength and prosperity." },
            { point: { x: 0.7, y: 0.3 }, text: "These sculptures depict scenes from daily life in medieval India." }
          ]
        },
        description: "Explore the detailed sculptural panels of this well-preserved 10th-century temple."
      },
      {
        id: 3,
        name: "Parsvanath Temple",
        location: "Eastern Complex",
        image: "temple-sculpture-8",
        tourData: {
          panoramas: [
            { position: "entrance", label: "Entrance" },
            { position: "jain-sculptures", label: "Jain Sculptures" },
            { position: "ceiling", label: "Ornate Ceiling" }
          ],
          annotations: [
            { point: { x: 0.5, y: 0.4 }, text: "Notice the less sensual nature of sculptures compared to Hindu temples, reflecting Jain principles." },
            { point: { x: 0.2, y: 0.6 }, text: "This image shows Parsvanath with the serpent hood above his head." }
          ]
        },
        description: "Discover the largest Jain temple at Khajuraho with its unique architectural elements."
      }
    ];
    
    virtualTours.forEach(tour => {
      this.virtualTours.set(tour.id, tour);
    });

    // Transport Options
    const transportOptions: TransportOption[] = [
      {
        id: 1,
        type: "air",
        fromLocation: "Delhi",
        details: {
          duration: "1h 15m",
          cost: "From ₹8,000",
          operators: ["Air India", "IndiGo"],
          frequency: "Selected days"
        },
        description: "Direct flights from Delhi to Khajuraho operate on selected days of the week. The flight duration is approximately 1 hour 15 minutes."
      },
      {
        id: 2,
        type: "air",
        fromLocation: "Varanasi",
        details: {
          duration: "45m",
          cost: "From ₹6,500",
          operators: ["Air India"],
          frequency: "Mon, Wed, Fri"
        },
        description: "Air India operates flights from Varanasi to Khajuraho three times a week."
      },
      {
        id: 3,
        type: "train",
        fromLocation: "Delhi",
        details: {
          duration: "Overnight journey + 1.5h taxi",
          cost: "Train: From ₹1,200, Taxi: ₹1,500",
          stations: ["Mahoba (63 km from Khajuraho)"],
          frequency: "Daily"
        },
        description: "Take an overnight train from Delhi to Mahoba, followed by a 1.5-hour taxi ride to Khajuraho."
      },
      {
        id: 4,
        type: "train",
        fromLocation: "Jhansi",
        details: {
          duration: "3h train + 2h taxi",
          cost: "Train: From ₹450, Taxi: ₹2,000",
          stations: ["Harpalpur (94 km from Khajuraho)"],
          frequency: "Multiple trains daily"
        },
        description: "Take a train from Jhansi to Harpalpur, followed by a taxi to Khajuraho."
      },
      {
        id: 5,
        type: "road",
        fromLocation: "Jhansi",
        details: {
          duration: "4-5 hours",
          cost: "Taxi: ₹3,500-4,000",
          distance: "175 km",
          roadCondition: "Good"
        },
        description: "Hire a taxi from Jhansi to Khajuraho. The journey takes 4-5 hours on well-maintained roads."
      },
      {
        id: 6,
        type: "road",
        fromLocation: "Orchha",
        details: {
          duration: "4 hours",
          cost: "Taxi: ₹3,500-4,000",
          distance: "172 km",
          roadCondition: "Good"
        },
        description: "Hire a taxi from Orchha to Khajuraho. The journey takes approximately 4 hours."
      },
      {
        id: 7,
        type: "air",
        fromLocation: "Hyderabad",
        details: {
          duration: "3-4 hours (with connection)",
          cost: "From ₹12,000",
          operators: ["Air India", "IndiGo"],
          connections: "Usually via Delhi"
        },
        description: "Flights from Hyderabad to Khajuraho typically involve a connection through Delhi or Mumbai."
      }
    ];
    
    transportOptions.forEach(option => {
      this.transportOpts.set(option.id, option);
    });

    // Itineraries
    const itineraries: Itinerary[] = [
      {
        id: 1,
        name: "Heritage Explorer",
        days: 3,
        targetPersona: "heritage-explorer",
        description: "Perfect for history enthusiasts who want to understand the architectural and cultural significance of Khajuraho in depth.",
        image: "temple-sculpture-3",
        timeline: [
          {
            day: 1,
            title: "Western Group Exploration",
            activities: [
              "Guided tour of Kandariya Mahadev Temple",
              "Visit to Lakshmana Temple",
              "Explore Chitragupta and Vishvanatha Temples",
              "Attend evening Light & Sound Show"
            ]
          },
          {
            day: 2,
            title: "Eastern & Southern Groups",
            activities: [
              "Morning visit to Parsvanath and Adinath Temples",
              "Lunch at local restaurant",
              "Afternoon exploration of Duladeo and Chaturbhuj Temples",
              "Sunset photography session"
            ]
          },
          {
            day: 3,
            title: "Archaeological Museum & Panna National Park",
            activities: [
              "Morning visit to Archaeological Museum",
              "Historical lecture by local expert",
              "Afternoon safari at Panna National Park",
              "Farewell dinner with cultural performance"
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Holistic Experience",
        days: 2,
        targetPersona: "holistic-experience",
        description: "A balanced experience combining heritage, local culture, and cuisine for those seeking a complete Khajuraho experience.",
        image: "temple-sculpture-3",
        timeline: [
          {
            day: 1,
            title: "Temple Highlights & Local Experiences",
            activities: [
              "Morning visit to Western Group temples",
              "Traditional lunch with local family",
              "Afternoon cultural village visit",
              "Evening cooking class featuring Bundelkhandi cuisine"
            ]
          },
          {
            day: 2,
            title: "Nature & More Temples",
            activities: [
              "Sunrise yoga near Eastern Group temples",
              "Visit to Jain temples",
              "Lunch at Raja Café",
              "Afternoon safari at Panna National Park",
              "Evening shopping for local handicrafts"
            ]
          }
        ]
      }
    ];
    
    itineraries.forEach(itinerary => {
      this.itineraries.set(itinerary.id, itinerary);
    });

    // Experiences
    const experiences: Experience[] = [
      {
        id: 1,
        name: "Sound & Light Show",
        description: "Experience the history of Khajuraho narrated through an immersive sound and light show against the backdrop of illuminated temples.",
        category: "Heritage",
        image: "temple-sculpture-5",
        duration: "50 minutes",
        price: "₹600 (English Show)"
      },
      {
        id: 2,
        name: "Cooking with Locals",
        description: "Learn to prepare traditional Bundelkhandi cuisine with a local family, and understand the cultural significance of regional food.",
        category: "Culture",
        image: "temple-sculpture-6",
        duration: "3 hours",
        price: "₹1,500 per person"
      },
      {
        id: 3,
        name: "Panna Tiger Reserve Safari",
        description: "Explore the nearby Panna National Park, home to tigers, leopards, and over 200 species of birds, offering a refreshing nature break.",
        category: "Wildlife",
        image: "temple-sculpture-7",
        duration: "3-4 hours",
        price: "₹2,500 per jeep"
      }
    ];
    
    experiences.forEach(experience => {
      this.experiences.set(experience.id, experience);
    });

    // Local Foods
    const localFoods: LocalFood[] = [
      {
        id: 1,
        name: "Bundeli Kadhi",
        description: "A yogurt-based curry flavored with gram flour and local spices, served with rice.",
        image: "cuisine-1",
        tag: "Must try!"
      },
      {
        id: 2,
        name: "Ras Roti",
        description: "Traditional wheat bread served with a sweet and spicy sauce made from seasonal ingredients.",
        image: "cuisine-2",
        tag: "Local favorite"
      },
      {
        id: 3,
        name: "Malpua",
        description: "Sweet pancakes made from a fermented batter, deep-fried and soaked in sugar syrup.",
        image: "cuisine-3",
        tag: "Popular dessert"
      },
      {
        id: 4,
        name: "Bhate Ka Raita",
        description: "Roasted and mashed eggplant mixed with yogurt and spices, served as a side dish.",
        image: "cuisine-4",
        tag: "Refreshing side"
      }
    ];
    
    localFoods.forEach(food => {
      this.localFoods.set(food.id, food);
    });

    // Restaurants
    const restaurants: Restaurant[] = [
      {
        id: 1,
        name: "Raja Café",
        description: "Located near the Western Group of temples with a garden seating area and views of the temples.",
        cuisine: "Indian, Continental",
        priceRange: "₹₹",
        rating: 4.5,
        reviews: 120
      },
      {
        id: 2,
        name: "Mediterraneo",
        description: "Popular restaurant serving Italian and Mediterranean cuisine along with local specialties.",
        cuisine: "Italian, Indian",
        priceRange: "₹₹₹",
        rating: 4.0,
        reviews: 85
      },
      {
        id: 3,
        name: "Madras Coffee House",
        description: "South Indian cuisine in a casual setting, perfect for breakfast or a light meal.",
        cuisine: "South Indian",
        priceRange: "₹",
        rating: 4.0,
        reviews: 92
      }
    ];
    
    restaurants.forEach(restaurant => {
      this.restaurants.set(restaurant.id, restaurant);
    });

    // Safety Tips
    const safetyTips: SafetyTip[] = [
      {
        id: 1,
        category: "women",
        tips: [
          "Khajuraho is generally safe for women travelers, but it's advisable to avoid isolated areas after dark",
          "Consider hiring a female guide when exploring temple complexes for added comfort",
          "Dress modestly when visiting temples and local villages",
          "Use pre-paid taxis or arrange transportation through your hotel",
          "Women-specific restrooms are available at major temple complexes and tourist facilities"
        ]
      },
      {
        id: 2,
        category: "seasonal",
        tips: [
          "Winter (Oct-Feb): Bring light jacket for evenings, temperatures range from 10-25°C",
          "Summer (Mar-Jun): Visit early morning, stay hydrated, temperatures can reach 45°C",
          "Monsoon (Jul-Sep): Carry umbrella/raincoat, insect repellent, moderate rainfall with humid conditions"
        ]
      },
      {
        id: 3,
        category: "general",
        tips: [
          "Wear comfortable footwear as you'll be walking on uneven surfaces",
          "Hire a licensed guide to understand the historical and cultural context",
          "Carry cash as ATMs are limited and card payments aren't widely accepted",
          "Photography is allowed, but no tripods without permission",
          "Start early to avoid crowds and afternoon heat",
          "Book accommodations in advance during peak season (Oct-Feb)"
        ]
      }
    ];
    
    safetyTips.forEach(tip => {
      this.safetyTips.set(tip.id, tip);
    });
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
    return Array.from(this.temples.values()).filter(temple => temple.groupId === groupId);
  }
  
  // Virtual Tour methods
  async getAllVirtualTours(): Promise<VirtualTour[]> {
    return Array.from(this.virtualTours.values());
  }
  
  async getVirtualTourById(id: number): Promise<VirtualTour | undefined> {
    return this.virtualTours.get(id);
  }
  
  // Transport options methods
  async getAllTransportOptions(): Promise<TransportOption[]> {
    return Array.from(this.transportOpts.values());
  }
  
  async getTransportOptionsByType(type: string): Promise<TransportOption[]> {
    return Array.from(this.transportOpts.values()).filter(option => option.type === type);
  }
  
  async getTransportOptionsByLocation(fromLocation: string): Promise<TransportOption[]> {
    return Array.from(this.transportOpts.values()).filter(option => option.fromLocation === fromLocation);
  }
  
  async getTransportOptionsByTypeAndLocation(type: string, fromLocation: string): Promise<TransportOption[]> {
    return Array.from(this.transportOpts.values()).filter(
      option => option.type === type && option.fromLocation === fromLocation
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
      itinerary => itinerary.targetPersona === targetPersona
    );
  }
  
  async getItinerariesByDays(days: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      itinerary => itinerary.days === days
    );
  }
  
  async getItinerariesByPersonaAndDays(targetPersona: string, days: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      itinerary => itinerary.targetPersona === targetPersona && itinerary.days === days
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
      experience => experience.category === category
    );
  }
  
  // Local food methods
  async getAllLocalFoods(): Promise<LocalFood[]> {
    return Array.from(this.localFoods.values());
  }
  
  // Restaurant methods
  async getAllRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }
  
  // Safety tips methods
  async getAllSafetyTips(): Promise<SafetyTip[]> {
    return Array.from(this.safetyTips.values());
  }
  
  async getSafetyTipsByCategory(category: string): Promise<SafetyTip[]> {
    return Array.from(this.safetyTips.values()).filter(
      tip => tip.category === category
    );
  }
}

export const storage = new MemStorage();
