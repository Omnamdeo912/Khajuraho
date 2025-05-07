import { useState } from "react";
import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Temple {
  id: number;
  name: string;
  description: string;
  image: string;
  details?: {
    architecture: string;
    history: string;
    significance: string;
    features: string[];
  };
}

const templeData: Record<string, Temple[]> = {
  western: [
    {
      id: 1,
      name: "Kandariya Mahadev Temple",
      description: "The largest and most ornate temple at Khajuraho, dedicated to Lord Shiva.",
      image: "/kandariya.jpg",
      details: {
        architecture:
          "Built in the 11th century, this temple is the largest and most ornate of all temples in Khajuraho. It stands 31 meters tall and has 84 subsidiary shrines.",
        history:
          "Constructed by King Vidyadhara of the Chandela dynasty, it represents the pinnacle of temple architecture in medieval India.",
        significance:
          "The temple is famous for its intricate carvings and sculptures depicting various aspects of life, including divine beings, celestial nymphs, and erotic scenes.",
        features: [
          "84 subsidiary shrines",
          "Intricate erotic sculptures",
          "Tallest temple in Khajuraho",
          "Elaborate carvings of gods and goddesses"
        ]
      }
    },
    {
      id: 2,
      name: "Lakshmana Temple",
      description: "One of the best preserved temples dedicated to Lord Vishnu.",
      image: "/lakshamana.jpeg"
    },
    {
      id: 3,
      name: "Chitragupta Temple",
      description: "Rare temple dedicated to Surya (Sun God) with eastward orientation.",
      image: "/chitragupta.jpg"
    },
    {
      id: 4,
      name: "Chausath Yogini Temple",
      description:
        "Temple dedicated to 64 Yoginis—female deities representing aspects of the Divine Feminine in Tantric traditions.",
      image: "/chausath.jpg"
    }
  ],
  eastern: [
    {
      id: 5,
      name: "Parsvanath Temple",
      description: "The largest Jain temple at Khajuraho with exquisite sculptures.",
      image: "/kdm.png"
    },
    {
      id: 6,
      name: "Adinath Temple",
      description: "Dedicated to the first Jain Tirthankara, with intricate carvings.",
      image: "/kdm.png"
    }
  ],
  southern: [
    {
      id: 7,
      name: "Duladeo Temple",
      description: "A Shiva temple known for its elegant sculptures of celestial beauties.",
      image: "/kdm.png"
    },
    {
      id: 8,
      name: "Chaturbhuj Temple",
      description: "Known for its massive carved image of Vishnu in the sanctum.",
      image: "/kdm.png"
    }
  ]
};

const TempleGroups = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof templeData>("western");
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);

  const handleTempleClick = (temple: Temple) => {
    if (temple.details) {
      setSelectedTemple(temple);
    } else {
      window.open("https://www.indianculture.gov.in/stories/temples-khajuraho", "_blank");
    }
  };

  const closeTempleDetails = () => setSelectedTemple(null);

  return (
    <section id="temples" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-['National_Park'] text-3xl text-[#5B2C2B] md:text-4xl font-bold text-center mb-16">
          Explore Temple Groups
        </h2>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-4">
          {Object.keys(templeData).map((group) => (
            <button
              key={group}
              className={`px-6 py-3 font-medium capitalize font-['National_Park'] ${
                activeTab === group
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => setActiveTab(group as keyof typeof templeData)}
            >
              {group} Group
            </button>
          ))}
        </div>

        {/* Temples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templeData[activeTab].map((temple) => (
            <div
              key={temple.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img src={temple.image} alt={temple.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-display font-bold text-xl mb-2">{temple.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{temple.description}</p>
                <button
                  onClick={() => handleTempleClick(temple)}
                  className="text-primary font-medium hover:text-primary/90 text-sm"
                >
                  Explore details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Temple Detail Modal */}
        {selectedTemple && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
              <button
                onClick={closeTempleDetails}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-2">{selectedTemple.name}</h3>
              <p className="mb-4 text-gray-700">{selectedTemple.details?.significance}</p>
              <h4 className="font-semibold mb-1">Architecture</h4>
              <p className="mb-2 text-gray-700">{selectedTemple.details?.architecture}</p>
              <h4 className="font-semibold mb-1">History</h4>
              <p className="mb-2 text-gray-700">{selectedTemple.details?.history}</p>
              <h4 className="font-semibold mb-1">Features</h4>
              <ul className="list-disc list-inside text-gray-700">
                {selectedTemple.details?.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TempleGroups;
