import { useState } from "react";
import { getImageUrl } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Play, Maximize, Info, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourOption {
  id: number;
  name: string;
  location: string;
  image: string;
}

const tourOptions: TourOption[] = [
  {
    id: 1,
    name: "Kandariya Mahadev",
    location: "Exterior & Inner Sanctum",
    image: "temple-sculpture-1"
  },
  {
    id: 2,
    name: "Lakshmana Temple",
    location: "Sculpture Gallery",
    image: "temple-sculpture-7"
  },
  {
    id: 3,
    name: "Parsvanath Temple",
    location: "Eastern Complex",
    image: "temple-sculpture-8"
  }
];

const VirtualTour = () => {
  const [activeTour, setActiveTour] = useState(tourOptions[0]);
  const [showAnnotation, setShowAnnotation] = useState(true);

  const handleTourChange = (tour: TourOption) => {
    setActiveTour(tour);
  };

  const handleAnnotationClick = () => {
    alert('This is the main hall of Kandariya Mahadev Temple, showcasing intricate ceiling carvings that depict celestial beings and floral motifs.');
  };

  return (
    <section id="virtualtour" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Immersive Virtual Tours</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the magnificent temples of Khajuraho from anywhere in the world with our 360° virtual tours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Virtual Tour Viewer */}
            <div className="virtual-tour-container rounded-lg overflow-hidden shadow-lg h-[500px] bg-black relative">
              <img
                src={getImageUrl("temple-sculpture-1")}
                alt={`Virtual Tour of ${activeTour.name}`}
                className="w-full h-full object-cover"
              />
              
              {/* Virtual Tour Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-display text-xl">{activeTour.name}</h3>
                    <p className="text-gray-300 text-sm">Main Hall - Western Complex</p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white" 
                      title="Previous"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white" 
                      title="Play Tour"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                    <button 
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white" 
                      title="Next"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button 
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white" 
                      title="Full Screen"
                    >
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Tour Indicator */}
              <div className="absolute top-4 right-4 bg-black/70 text-white py-1 px-3 rounded-full text-sm backdrop-blur-sm">
                <Compass className="h-4 w-4 mr-1 inline-block" /> 360° View
              </div>
              
              {/* Educational Annotation */}
              {showAnnotation && (
                <div 
                  className="absolute top-1/3 left-1/4 animate-pulse cursor-pointer"
                  onClick={handleAnnotationClick}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center">
                    <Info className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="font-display font-bold text-xl mb-3">Tour Options</h3>
              <ul className="space-y-3">
                {tourOptions.map((tour) => (
                  <li key={tour.id}>
                    <button
                      className={`flex items-center p-3 rounded-lg w-full text-left ${
                        activeTour.id === tour.id ? "bg-background" : "hover:bg-background"
                      } transition-colors`}
                      onClick={() => handleTourChange(tour)}
                    >
                      <img
                        src={getImageUrl(tour.image)}
                        alt={tour.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium">{tour.name}</h4>
                        <p className="text-xs text-gray-500">{tour.location}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <a href="#" className="text-primary font-medium hover:text-primary/90 transition-colors text-sm">
                  View all virtual tours →
                </a>
              </div>
            </div>
            
            <div className="bg-background rounded-lg shadow-md p-5">
              <h3 className="font-display font-bold text-xl mb-3">Did You Know?</h3>
              <p className="text-gray-700 text-sm">
                The sculptures at Khajuraho are known for their intricate details and craftsmanship. Each figure is carved with such precision that you can see jewelry, hairstyles, and even emotional expressions on faces less than a few inches in size.
              </p>
              <button className="mt-3 text-primary font-medium hover:text-primary/90 transition-colors text-sm">
                More fascinating facts →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
