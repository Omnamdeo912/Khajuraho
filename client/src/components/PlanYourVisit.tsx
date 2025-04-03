import { useState } from "react";
import { Clock, Check, Plane, Train, Bus, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { getImageUrl } from "@/lib/utils";
import CustomItineraryPlanner from "./CustomItineraryPlanner";

type PlanTab = "getting-there" | "itineraries" | "accommodation" | "seasonal";

const PlanYourVisit = () => {
  const [activeTab, setActiveTab] = useState<PlanTab>("getting-there");
  const [startingPoint, setStartingPoint] = useState("Delhi");
  const [travelMode, setTravelMode] = useState("flight");
  const [travelDate, setTravelDate] = useState("");

  const handleTabChange = (tab: PlanTab) => {
    setActiveTab(tab);
  };

  return (
    <section id="plan" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know to plan your perfect trip to Khajuraho.
          </p>
        </div>
        
        {/* Planning Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center border-b border-gray-300">
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === "getting-there" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => handleTabChange("getting-there")}
            >
              Getting There
            </button>
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === "itineraries" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => handleTabChange("itineraries")}
            >
              Itineraries
            </button>
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === "accommodation" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => handleTabChange("accommodation")}
            >
              Stay & Dining
            </button>
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === "seasonal" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => handleTabChange("seasonal")}
            >
              Best Time to Visit
            </button>
          </div>
        </div>
        
        {/* Getting There Tab Content */}
        <div className={activeTab === "getting-there" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-display text-2xl font-bold mb-4">How to Reach Khajuraho</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-primary/20 rounded-full p-3 mr-4">
                      <Plane className="text-primary h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">By Air</h4>
                      <p className="text-gray-700 mb-4">
                        Khajuraho has a domestic airport with direct flights from Delhi and Varanasi. Flight duration from Delhi is approximately 1 hour 15 minutes.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-md p-3">
                          <p className="font-medium text-sm mb-1">From Delhi</p>
                          <p className="text-xs text-gray-600">1h 15m flight • From ₹8,000</p>
                          <p className="text-xs text-gray-600">Air India, IndiGo (Selected days)</p>
                        </div>
                        <div className="border border-gray-200 rounded-md p-3">
                          <p className="font-medium text-sm mb-1">From Varanasi</p>
                          <p className="text-xs text-gray-600">45m flight • From ₹6,500</p>
                          <p className="text-xs text-gray-600">Air India (Mon, Wed, Fri)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-primary/20 rounded-full p-3 mr-4">
                      <Train className="text-primary h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">By Train</h4>
                      <p className="text-gray-700 mb-4">
                        The nearest major railway station is at Mahoba (63 km) and Harpalpur (94 km). The small Khajuraho station has limited train connectivity.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-md p-3">
                          <p className="font-medium text-sm mb-1">From Delhi</p>
                          <p className="text-xs text-gray-600">Overnight journey to Mahoba • From ₹1,200</p>
                          <p className="text-xs text-gray-600">+ 1.5 hour taxi to Khajuraho (₹1,500)</p>
                        </div>
                        <div className="border border-gray-200 rounded-md p-3">
                          <p className="font-medium text-sm mb-1">From Jhansi</p>
                          <p className="text-xs text-gray-600">3h train to Harpalpur • From ₹450</p>
                          <p className="text-xs text-gray-600">+ 2 hour taxi to Khajuraho (₹2,000)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-primary/20 rounded-full p-3 mr-4">
                      <Bus className="text-primary h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">By Road</h4>
                      <p className="text-gray-700 mb-4">
                        Khajuraho is well-connected by road to major cities in Madhya Pradesh. The roads are in good condition for the most part.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-md p-3">
                          <p className="font-medium text-sm mb-1">From Jhansi</p>
                          <p className="text-xs text-gray-600">175 km • 4-5 hours by car</p>
                          <p className="text-xs text-gray-600">Taxi fare: ₹3,500-4,000</p>
                        </div>
                        <div className="border border-gray-200 rounded-md p-3">
                          <p className="font-medium text-sm mb-1">From Orchha</p>
                          <p className="text-xs text-gray-600">172 km • 4 hours by car</p>
                          <p className="text-xs text-gray-600">Taxi fare: ₹3,500-4,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-primary p-4">
                    <h3 className="font-display text-white font-bold text-xl">Travel Planner</h3>
                  </div>
                  <div className="p-5">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="starting-point">Starting Point</Label>
                        <select 
                          id="starting-point"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-3 border"
                          value={startingPoint}
                          onChange={(e) => setStartingPoint(e.target.value)}
                        >
                          <option value="Delhi">Delhi</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Jhansi">Jhansi</option>
                          <option value="Varanasi">Varanasi</option>
                          <option value="Hyderabad">Hyderabad</option>
                        </select>
                      </div>
                      <div>
                        <Label>Travel Mode</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            type="button"
                            variant={travelMode === "flight" ? "default" : "outline"}
                            className="py-2 text-sm"
                            onClick={() => setTravelMode("flight")}
                          >
                            Flight
                          </Button>
                          <Button
                            type="button"
                            variant={travelMode === "train" ? "default" : "outline"}
                            className="py-2 text-sm"
                            onClick={() => setTravelMode("train")}
                          >
                            Train
                          </Button>
                          <Button
                            type="button"
                            variant={travelMode === "road" ? "default" : "outline"}
                            className="py-2 text-sm"
                            onClick={() => setTravelMode("road")}
                          >
                            Road
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="travel-date">Travel Date</Label>
                        <Input
                          id="travel-date"
                          type="date"
                          className="w-full"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                        />
                      </div>
                      <Button className="w-full">Get Travel Options</Button>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-lg mb-3">Need Help Planning?</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Our travel experts can help you plan your perfect Khajuraho itinerary.
                      </p>
                      <Button 
                        variant="outline" 
                        className="flex items-center justify-center w-full border-primary text-primary hover:bg-primary/20 hover:text-primary"
                      >
                        <Phone className="mr-2 h-4 w-4" /> Contact Travel Expert
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Itineraries Tab Content */}
        <div className={activeTab === "itineraries" ? "block" : "hidden"}>
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-2">Explore Our Curated Itineraries</h3>
                <p className="text-gray-600 mb-6">
                  Discover itineraries tailored for different traveler types, whether you're a Heritage Explorer seeking deep architectural insights or a Complete Traveller looking for a balanced experience of culture, temples, and nature.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-2 mr-3 flex-shrink-0">
                      <Check className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Personalized Routes</h4>
                      <p className="text-sm text-gray-600">Starting from Delhi or Hyderabad with multiple options</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-2 mr-3 flex-shrink-0">
                      <Check className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Expert-Designed Plans</h4>
                      <p className="text-sm text-gray-600">Carefully crafted itineraries by travel specialists</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-2 mr-3 flex-shrink-0">
                      <Check className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Customizable Options</h4>
                      <p className="text-sm text-gray-600">Flexibility to modify based on your interests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Itinerary Planner Component */}
          <div className="w-full">
            <CustomItineraryPlanner />
          </div>
        </div>
        
        {/* Accommodation Tab Content */}
        <div className={activeTab === "accommodation" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-display text-2xl font-bold mb-6">Accommodation Options</h3>
              
              <div className="space-y-6">
                {/* Luxury */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h4 className="font-bold text-xl mb-4 text-primary">Luxury Stays</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={getImageUrl("accommodation-1")} 
                        alt="The Lalit Temple View" 
                        className="w-1/3 object-cover" 
                      />
                      <div className="p-3 w-2/3">
                        <h5 className="font-medium text-lg">The Lalit Temple View</h5>
                        <div className="flex text-yellow-500 text-xs mb-1">
                          <span>★★★★★</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Luxury resort with temple views</p>
                        <p className="text-sm font-medium">From ₹12,000/night</p>
                      </div>
                    </div>
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={getImageUrl("accommodation-2")} 
                        alt="Radisson Jass Hotel" 
                        className="w-1/3 object-cover" 
                      />
                      <div className="p-3 w-2/3">
                        <h5 className="font-medium text-lg">Radisson Jass Hotel</h5>
                        <div className="flex text-yellow-500 text-xs mb-1">
                          <span>★★★★☆</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Contemporary luxury</p>
                        <p className="text-sm font-medium">From ₹8,500/night</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mid-range */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h4 className="font-bold text-xl mb-4 text-primary">Mid-range Options</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={getImageUrl("accommodation-3")} 
                        alt="Ramada Khajuraho" 
                        className="w-1/3 object-cover" 
                      />
                      <div className="p-3 w-2/3">
                        <h5 className="font-medium text-lg">Ramada Khajuraho</h5>
                        <div className="flex text-yellow-500 text-xs mb-1">
                          <span>★★★☆☆</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Well-appointed rooms</p>
                        <p className="text-sm font-medium">From ₹4,500/night</p>
                      </div>
                    </div>
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={getImageUrl("accommodation-4")} 
                        alt="Hotel Chandela" 
                        className="w-1/3 object-cover" 
                      />
                      <div className="p-3 w-2/3">
                        <h5 className="font-medium text-lg">Hotel Chandela</h5>
                        <div className="flex text-yellow-500 text-xs mb-1">
                          <span>★★★☆☆</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Local charm with modern comforts</p>
                        <p className="text-sm font-medium">From ₹3,800/night</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Budget */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h4 className="font-bold text-xl mb-4 text-primary">Budget Stays</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={getImageUrl("accommodation-1")} 
                        alt="Hotel Harmony" 
                        className="w-1/3 object-cover" 
                      />
                      <div className="p-3 w-2/3">
                        <h5 className="font-medium text-lg">Hotel Harmony</h5>
                        <div className="flex text-yellow-500 text-xs mb-1">
                          <span>★★☆☆☆</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Clean, basic accommodations</p>
                        <p className="text-sm font-medium">From ₹1,800/night</p>
                      </div>
                    </div>
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={getImageUrl("accommodation-2")} 
                        alt="Yogi Lodge" 
                        className="w-1/3 object-cover" 
                      />
                      <div className="p-3 w-2/3">
                        <h5 className="font-medium text-lg">Yogi Lodge</h5>
                        <div className="flex text-yellow-500 text-xs mb-1">
                          <span>★★☆☆☆</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Backpacker friendly</p>
                        <p className="text-sm font-medium">From ₹1,200/night</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary p-4">
                  <h3 className="font-display text-white font-bold text-xl">Accommodation Finder</h3>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="check-in">Check-in Date</Label>
                      <Input id="check-in" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="check-out">Check-out Date</Label>
                      <Input id="check-out" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="room-type">Room Type</Label>
                      <select 
                        id="room-type"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-3 border"
                      >
                        <option>Standard Room</option>
                        <option>Deluxe Room</option>
                        <option>Suite</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="budget-range">Budget Range</Label>
                      <select 
                        id="budget-range"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-3 border"
                      >
                        <option>Budget (Under ₹2,000)</option>
                        <option>Mid-range (₹2,000-5,000)</option>
                        <option>Luxury (Above ₹5,000)</option>
                      </select>
                    </div>
                    <Button className="w-full">Find Accommodation</Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-lg mb-3">Need Special Arrangements?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      We can help with group bookings or special requirements.
                    </p>
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center w-full border-primary text-primary hover:bg-primary/20 hover:text-primary"
                    >
                      <Phone className="mr-2 h-4 w-4" /> Speak to a Booking Agent
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seasonal Tab Content */}
        <div className={activeTab === "seasonal" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Best Time to Visit</h3>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-4 text-primary">Winter (October to February)</h4>
                  <p className="text-gray-700 mb-4">
                    The ideal time to visit Khajuraho with pleasant temperatures ranging from 10°C to 25°C. The clear skies and cool weather make it perfect for temple exploration and outdoor activities.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Pros</h5>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Perfect weather for sightseeing</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Major festivals and events</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Clear photographic conditions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Cons</h5>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Peak tourist season</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Higher accommodation prices</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Advanced booking recommended</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-background rounded">
                    <p className="text-sm font-medium">Pack light woolens for the evenings and early mornings. Daytime is usually pleasant with bright sunlight.</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-4 text-primary">Summer (March to June)</h4>
                  <p className="text-gray-700 mb-4">
                    Summer can be extremely hot in Khajuraho with temperatures often reaching 45°C. While not the most comfortable time for extensive temple exploration, early morning visits can be manageable.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Pros</h5>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Lower tourist crowds</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Discounted accommodation</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Wildlife viewing at Panna National Park</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Cons</h5>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Extreme heat (35-45°C)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Limited hours for comfortable exploration</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Risk of dehydration and heat exhaustion</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-background rounded">
                    <p className="text-sm font-medium">If visiting in summer, schedule temple visits early morning before 10AM or late afternoon after 4PM. Carry ample water and sun protection.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-4 text-primary">Monsoon (July to September)</h4>
                  <p className="text-gray-700 mb-4">
                    The monsoon brings moderate rainfall to Khajuraho, turning the surroundings lush green. While not the peak tourist season, this period offers its own charm with fewer crowds and beautiful landscapes.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Pros</h5>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Lush green surroundings</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Lower accommodation rates</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Pleasant temperatures (25-35°C)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Cons</h5>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Unpredictable rainfall can interrupt plans</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">High humidity levels</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-red-500 mt-1 mr-2 h-3 w-3" />
                          <span className="text-sm">Some activities might be limited</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-background rounded">
                    <p className="text-sm font-medium">Carry rain gear and insect repellent. The temples can be slippery when wet, so appropriate footwear is recommended.</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-4 text-primary">Monthly Weather Guide</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 text-sm font-medium border-b pb-2">
                      <div>Month</div>
                      <div>Temperature</div>
                      <div>Precipitation</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>January</div>
                      <div>8-24°C</div>
                      <div>Low</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>February</div>
                      <div>12-28°C</div>
                      <div>Low</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>March</div>
                      <div>16-33°C</div>
                      <div>Low</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>April</div>
                      <div>22-38°C</div>
                      <div>Low</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>May</div>
                      <div>26-42°C</div>
                      <div>Low</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>June</div>
                      <div>28-41°C</div>
                      <div>Medium</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>July</div>
                      <div>25-34°C</div>
                      <div>High</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>August</div>
                      <div>24-32°C</div>
                      <div>High</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>September</div>
                      <div>24-33°C</div>
                      <div>Medium</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>October</div>
                      <div>18-33°C</div>
                      <div>Low</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm border-b pb-2">
                      <div>November</div>
                      <div>13-29°C</div>
                      <div>Low</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm">
                      <div>December</div>
                      <div>8-25°C</div>
                      <div>Low</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-background rounded">
                    <p className="text-sm font-medium text-primary">Our Recommendation: October to March is the optimal time to visit Khajuraho for the best experience.</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-4 text-primary">Festival Calendar</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium">Khajuraho Dance Festival (February)</h5>
                      <p className="text-sm text-gray-700">A week-long celebration of classical Indian dances performed against the backdrop of illuminated temples.</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Mahashivratri (February/March)</h5>
                      <p className="text-sm text-gray-700">Special celebrations at the Shiva temples with rituals and processions.</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Diwali (October/November)</h5>
                      <p className="text-sm text-gray-700">The temples are beautifully illuminated during this festival of lights.</p>
                    </div>
                  </div>
                  <Button className="mt-4 w-full">View Full Festival Calendar</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanYourVisit;
