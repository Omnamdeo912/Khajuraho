import { useState } from "react";
import { getImageUrl } from "@/lib/utils";
import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Temple {
  id: number;
  name: string;
  description: string;
  image: string;
}

const westernTemples: Temple[] = [
  {
    id: 1,
    name: "Kandariya Mahadev Temple",
    description: "The largest and most ornate temple at Khajuraho, dedicated to Lord Shiva.",
    image: "temple-exterior-2"
  },
  {
    id: 2,
    name: "Lakshmana Temple",
    description: "One of the best preserved temples dedicated to Lord Vishnu.",
    image: "temple-exterior-3"
  },
  {
    id: 3,
    name: "Chitragupta Temple",
    description: "Rare temple dedicated to Surya (Sun God) with eastward orientation.",
    image: "temple-exterior-4"
  },
  {
    id: 4,
    name: "Vishvanatha Temple",
    description: "Dedicated to Lord Shiva with a large Nandi statue facing the shrine.",
    image: "temple-exterior-5"
  }
];

const easternTemples: Temple[] = [
  {
    id: 5,
    name: "Parsvanath Temple",
    description: "The largest Jain temple at Khajuraho with exquisite sculptures.",
    image: "temple-exterior-6"
  },
  {
    id: 6,
    name: "Adinath Temple",
    description: "Dedicated to the first Jain Tirthankara, with intricate carvings.",
    image: "temple-exterior-7"
  }
];

const southernTemples: Temple[] = [
  {
    id: 7,
    name: "Duladeo Temple",
    description: "A Shiva temple known for its elegant sculptures of celestial beauties.",
    image: "temple-exterior-8"
  },
  {
    id: 8,
    name: "Chaturbhuj Temple",
    description: "Known for its massive carved image of Vishnu in the sanctum.",
    image: "temple-exterior-5"
  }
];

type TempleGroupTab = "western" | "eastern" | "southern";

const TempleGroups = () => {
  const [activeTab, setActiveTab] = useState<TempleGroupTab>("western");

  const handleTabChange = (tab: TempleGroupTab) => {
    setActiveTab(tab);
  };

  return (
    <section id="temples" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
          Explore Temple Groups
        </h2>
        
        {/* Temple Group Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center border-b border-gray-300">
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === "western" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => handleTabChange("western")}
            >
              Western Group
            </button>
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === "eastern" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => handleTabChange("eastern")}
            >
              Eastern Group
            </button>
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === "southern" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => handleTabChange("southern")}
            >
              Southern Group
            </button>
          </div>
        </div>
        
        {/* Western Group Tab Content */}
        <div className={activeTab === "western" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {westernTemples.map((temple) => (
                  <div key={temple.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <img 
                      src={getImageUrl(temple.image)} 
                      alt={temple.name} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-4">
                      <h3 className="font-display font-bold text-xl mb-2">{temple.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{temple.description}</p>
                      <a href="#" className="text-primary font-medium hover:text-primary/90 transition-colors text-sm">
                        Explore details →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-display font-bold text-xl mb-4">Western Group Overview</h3>
              <p className="text-gray-700 mb-4">
                The Western Group of temples is the largest and most important group at Khajuraho, containing the most magnificent temples.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Contains the largest temple, Kandariya Mahadev</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Most well-preserved collection</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Features stunning architectural innovations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Main tourist attraction with light & sound show</span>
                </li>
              </ul>
              <div className="p-4 bg-background rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Clock className="text-primary mr-2 h-4 w-4" />
                  <span className="font-medium">Visiting Information</span>
                </div>
                <p className="text-sm text-gray-700">Open daily from 8:00 AM to 6:00 PM</p>
                <p className="text-sm text-gray-700">Entry fee: ₹40 (Indians), ₹600 (Foreigners)</p>
                <p className="text-sm text-gray-700">Light & Sound Show: 6:30 PM (English), 7:40 PM (Hindi)</p>
              </div>
              <Button className="w-full text-sm">View All Western Temples</Button>
            </div>
          </div>
        </div>
        
        {/* Eastern Group Tab Content */}
        <div className={activeTab === "eastern" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {easternTemples.map((temple) => (
                  <div key={temple.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <img 
                      src={getImageUrl(temple.image)} 
                      alt={temple.name} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-4">
                      <h3 className="font-display font-bold text-xl mb-2">{temple.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{temple.description}</p>
                      <a href="#" className="text-primary font-medium hover:text-primary/90 transition-colors text-sm">
                        Explore details →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-display font-bold text-xl mb-4">Eastern Group Overview</h3>
              <p className="text-gray-700 mb-4">
                The Eastern Group consists primarily of Jain temples, showcasing a different architectural style compared to Hindu temples.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Features prominent Jain temples</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Less crowded than Western Group</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Showcases distinct Jain iconography</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Includes Hindu temples like Brahma and Vamana</span>
                </li>
              </ul>
              <div className="p-4 bg-background rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Clock className="text-primary mr-2 h-4 w-4" />
                  <span className="font-medium">Visiting Information</span>
                </div>
                <p className="text-sm text-gray-700">Open daily from 8:00 AM to 6:00 PM</p>
                <p className="text-sm text-gray-700">Entry fee: ₹40 (Indians), ₹600 (Foreigners)</p>
                <p className="text-sm text-gray-700">About 1 km from the Western Group</p>
              </div>
              <Button className="w-full text-sm">View All Eastern Temples</Button>
            </div>
          </div>
        </div>
        
        {/* Southern Group Tab Content */}
        <div className={activeTab === "southern" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {southernTemples.map((temple) => (
                  <div key={temple.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <img 
                      src={getImageUrl(temple.image)} 
                      alt={temple.name} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-4">
                      <h3 className="font-display font-bold text-xl mb-2">{temple.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{temple.description}</p>
                      <a href="#" className="text-primary font-medium hover:text-primary/90 transition-colors text-sm">
                        Explore details →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-display font-bold text-xl mb-4">Southern Group Overview</h3>
              <p className="text-gray-700 mb-4">
                The Southern Group is more remote and includes some of the later-period temples that showcase evolving architectural styles.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">More secluded and serene atmosphere</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Fewer tourists visit this area</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Located about 5 km from main complex</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 h-4 w-4" />
                  <span className="text-gray-700">Shows evolution of temple architecture</span>
                </li>
              </ul>
              <div className="p-4 bg-background rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Clock className="text-primary mr-2 h-4 w-4" />
                  <span className="font-medium">Visiting Information</span>
                </div>
                <p className="text-sm text-gray-700">Open daily from 8:00 AM to 6:00 PM</p>
                <p className="text-sm text-gray-700">Entry fee: ₹40 (Indians), ₹600 (Foreigners)</p>
                <p className="text-sm text-gray-700">Taxi ride required from main complex</p>
              </div>
              <Button className="w-full text-sm">View All Southern Temples</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempleGroups;
