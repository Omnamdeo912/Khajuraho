import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ChevronRight, Calendar, Briefcase, MapPin, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Itinerary, User as SelectUser } from "@shared/schema";
import { getImageUrl } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { getQueryFn } from "@/lib/queryClient";

// Enhanced Itinerary type with specific typed JSON fields
interface EnhancedItinerary extends Omit<Itinerary, 'highlights' | 'includedServices'> {
  highlights?: string[];
  includedServices?: string[];
}

const CustomItineraryPlanner = () => {
  const [selectedDepartureFrom, setSelectedDepartureFrom] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Try to get user from auth context, but handle the case when it's not available
  const [currentUser, setCurrentUser] = useState<SelectUser | null>(null);
  
  try {
    const auth = useAuth();
    
    // Set filters based on user type if available
    useEffect(() => {
      if (auth.user) {
        setCurrentUser(auth.user);
        
        if (auth.user.userType === "heritage-explorer") {
          setSelectedPersona("heritage-explorer");
        } else if (auth.user.userType === "holistic-experience") {
          setSelectedPersona("holistic-experience");
        }
      }
    }, [auth.user]);
  } catch (error) {
    // If auth context is not available, continue without user personalization
    console.log("Auth context not available, continuing without user personalization");
  }

  // Fetch itineraries
  const { data: rawItineraries, isLoading } = useQuery<Itinerary[]>({
    queryKey: ["/api/itineraries"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: true,
  });
  
  // Type-cast itineraries with our enhanced type
  const itineraries = rawItineraries as EnhancedItinerary[] | undefined;

  // Filter itineraries based on selected criteria
  const filteredItineraries = itineraries?.filter(itinerary => {
    // If no filters are applied, show all itineraries
    if (!selectedDepartureFrom && !selectedPersona && !selectedDays) {
      return true;
    }

    let matchesDeparture = true;
    let matchesPersona = true;
    let matchesDays = true;

    if (selectedDepartureFrom) {
      matchesDeparture = itinerary.departureFrom === selectedDepartureFrom;
    }

    if (selectedPersona) {
      matchesPersona = itinerary.targetPersona === selectedPersona;
    }

    if (selectedDays) {
      matchesDays = itinerary.days === selectedDays;
    }

    return matchesDeparture && matchesPersona && matchesDays;
  });

  const departureOptions = [
    { value: null, label: "All Departures" },
    { value: "Delhi", label: "From Delhi" },
    { value: "Hyderabad", label: "From Hyderabad" },
    { value: null, label: "Local Packages" }
  ];

  const personaOptions = [
    { value: null, label: "All Travelers" },
    { value: "heritage-explorer", label: "Heritage Explorer" },
    { value: "holistic-experience", label: "Complete Traveller" }
  ];

  const daysOptions = [
    { value: null, label: "Any Duration" },
    { value: 2, label: "2 Days" },
    { value: 3, label: "3 Days" },
    { value: 4, label: "4 Days" },
    { value: 5, label: "5 Days" }
  ];

  const clearFilters = () => {
    setSelectedDepartureFrom(null);
    setSelectedPersona(currentUser?.userType || null);
    setSelectedDays(null);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Helper to get user-friendly persona name
  const getPersonaName = (persona: string) => {
    return persona === "heritage-explorer" 
      ? "Heritage Explorer" 
      : persona === "holistic-experience" 
        ? "Complete Traveller" 
        : persona;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h3 className="font-display text-2xl font-bold">Plan Your Perfect Itinerary</h3>
          <p className="text-gray-600 mt-1">Curated itineraries designed for your travel preferences</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={toggleFilters}
            className="flex items-center"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Filter Itineraries</CardTitle>
            <CardDescription>Customize your search based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Departure Location</label>
                <Select
                  value={selectedDepartureFrom}
                  onValueChange={(value) => setSelectedDepartureFrom(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Departures" />
                  </SelectTrigger>
                  <SelectContent>
                    {departureOptions.map((option) => (
                      <SelectItem key={option.label} value={option.value || ""}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Traveler Type</label>
                <Select 
                  value={selectedPersona}
                  onValueChange={(value) => setSelectedPersona(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    {personaOptions.map((option) => (
                      <SelectItem key={option.label} value={option.value || ""}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <Select
                  value={selectedDays?.toString() || ""}
                  onValueChange={(value) => setSelectedDays(value ? parseInt(value) : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOptions.map((option) => (
                      <SelectItem key={option.label} value={option.value?.toString() || ""}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <p className="text-sm text-gray-500">
              {filteredItineraries?.length || 0} itineraries found
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" /> Clear Filters
            </Button>
          </CardFooter>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredItineraries?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="flex justify-center mb-4">
            <MapPin className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No itineraries found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or explore our other options</p>
          <Button onClick={clearFilters}>Show All Itineraries</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredItineraries?.map((itinerary) => (
            <Card key={itinerary.id} className="overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={getImageUrl(itinerary.image)} 
                  alt={itinerary.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white text-primary">
                    {itinerary.days} Days
                  </Badge>
                  {itinerary.departureFrom && (
                    <Badge variant="secondary" className="bg-white text-primary">
                      From {itinerary.departureFrom}
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{itinerary.name}</CardTitle>
                    <CardDescription className="mt-1">{itinerary.description}</CardDescription>
                  </div>
                  <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-0">
                    {getPersonaName(itinerary.targetPersona)}
                  </Badge>
                </div>
              </CardHeader>
              
              {itinerary.highlights && (
                <CardContent>
                  <h4 className="font-medium text-sm mb-2">Highlights</h4>
                  <ul className="space-y-1">
                    {itinerary.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="flex text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                    {itinerary.highlights.length > 3 && (
                      <li className="text-sm text-primary cursor-pointer hover:underline pl-6">
                        +{itinerary.highlights.length - 3} more highlights
                      </li>
                    )}
                  </ul>
                </CardContent>
              )}
              
              <CardFooter className="flex justify-between border-t pt-6">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> {itinerary.days} days itinerary
                  </p>
                </div>
                <Button size="sm" className="flex items-center">
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomItineraryPlanner;

