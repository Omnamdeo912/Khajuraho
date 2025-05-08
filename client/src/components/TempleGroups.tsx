// import { useState } from "react";
// import { Check, Clock } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface Temple {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   details?: {
//     architecture: string;
//     history: string;
//     significance: string;
//     features: string[];
//   };
// }

// const templeData: Record<string, Temple[]> = {
//   western: [
//     {
//       id: 1,
//       name: "Kandariya Mahadev Temple",
//       description: "The largest and most ornate temple at Khajuraho, dedicated to Lord Shiva.",
//       image: "/kandariya.jpg",
//       details: {
//         architecture:
//           "Built in the 11th century, this temple is the largest and most ornate of all temples in Khajuraho. It stands 31 meters tall and has 84 subsidiary shrines.",
//         history:
//           "Constructed by King Vidyadhara of the Chandela dynasty, it represents the pinnacle of temple architecture in medieval India.",
//         significance:
//           "The temple is famous for its intricate carvings and sculptures depicting various aspects of life, including divine beings, celestial nymphs, and erotic scenes.",
//         features: [
//           "84 subsidiary shrines",
//           "Intricate erotic sculptures",
//           "Tallest temple in Khajuraho",
//           "Elaborate carvings of gods and goddesses"
//         ]
//       }
//     },
//     {
//       id: 2,
//       name: "Lakshmana Temple",
//       description: "One of the best preserved temples dedicated to Lord Vishnu.",
//       image: "/lakshamana.jpeg"
//     },
//     {
//       id: 3,
//       name: "Chitragupta Temple",
//       description: "Rare temple dedicated to Surya (Sun God) with eastward orientation.",
//       image: "/chitragupta.jpg"
//     },
//     {
//       id: 4,
//       name: "Chausath Yogini Temple",
//       description:
//         "Temple dedicated to 64 Yoginis—female deities representing aspects of the Divine Feminine in Tantric traditions.",
//       image: "/chausath.jpg"
//     }
//   ],
//   eastern: [
//     {
//       id: 5,
//       name: "Parsvanath Temple",
//       description: "The largest Jain temple at Khajuraho with exquisite sculptures.",
//       image: "/kdm.png"
//     },
//     {
//       id: 6,
//       name: "Adinath Temple",
//       description: "Dedicated to the first Jain Tirthankara, with intricate carvings.",
//       image: "/kdm.png"
//     }
//   ],
//   southern: [
//     {
//       id: 7,
//       name: "Duladeo Temple",
//       description: "A Shiva temple known for its elegant sculptures of celestial beauties.",
//       image: "/kdm.png"
//     },
//     {
//       id: 8,
//       name: "Chaturbhuj Temple",
//       description: "Known for its massive carved image of Vishnu in the sanctum.",
//       image: "/kdm.png"
//     }
//   ]
// };

// const TempleGroups = () => {
//   const [activeTab, setActiveTab] = useState<keyof typeof templeData>("western");
//   const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);

//   const handleTempleClick = (temple: Temple) => {
//     if (temple.details) {
//       setSelectedTemple(temple);
//     } else {
//       window.open("https://www.indianculture.gov.in/stories/temples-khajuraho", "_blank");
//     }
//   };

//   const closeTempleDetails = () => setSelectedTemple(null);

//   return (
//     <section id="temples" className="py-16 bg-gray-100">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="font-['National_Park'] text-3xl text-[#5B2C2B] md:text-4xl font-bold text-center mb-16">
//           Explore Temple Groups
//         </h2>

//         {/* Tabs */}
//         <div className="mb-8 flex justify-center gap-4">
//           {Object.keys(templeData).map((group) => (
//             <button
//               key={group}
//               className={`px-6 py-3 font-medium capitalize font-['National_Park'] ${
//                 activeTab === group
//                   ? "text-primary border-b-2 border-primary"
//                   : "text-gray-500 hover:text-primary"
//               }`}
//               onClick={() => setActiveTab(group as keyof typeof templeData)}
//             >
//               {group} Group
//             </button>
//           ))}
//         </div>

//         {/* Temples Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {templeData[activeTab].map((temple) => (
//             <div
//               key={temple.id}
//               className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//             >
//               <img src={temple.image} alt={temple.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="font-display font-bold text-xl mb-2">{temple.name}</h3>
//                 <p className="text-gray-600 text-sm mb-3">{temple.description}</p>
//                 <button
//                   onClick={() => handleTempleClick(temple)}
//                   className="text-primary font-medium hover:text-primary/90 text-sm"
//                 >
//                   Explore details →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Temple Detail Modal */}
//         {selectedTemple && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
//               <button
//                 onClick={closeTempleDetails}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//               >
//                 ✕
//               </button>
//               <h3 className="text-2xl font-bold mb-2">{selectedTemple.name}</h3>
//               <p className="mb-4 text-gray-700">{selectedTemple.details?.significance}</p>
//               <h4 className="font-semibold mb-1">Architecture</h4>
//               <p className="mb-2 text-gray-700">{selectedTemple.details?.architecture}</p>
//               <h4 className="font-semibold mb-1">History</h4>
//               <p className="mb-2 text-gray-700">{selectedTemple.details?.history}</p>
//               <h4 className="font-semibold mb-1">Features</h4>
//               <ul className="list-disc list-inside text-gray-700">
//                 {selectedTemple.details?.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TempleGroups;


import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TempleDetails {
  architecture: string;
  history: string;
  significance: string;
  features: string[];
}

interface Temple {
  id: number;
  name: string;
  description: string;
  image: string;
  details: TempleDetails;
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
          "Famous for its intricate carvings depicting divine beings, celestial nymphs, and erotic scenes symbolizing the four goals of life.",
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
      image: "/lakshamana.jpeg",
      details: {
        architecture:
          "Built around 950 CE, with a single shikhara and an ornate mandapa featuring fine sculptures.",
        history:
          "Commissioned by Yashovarman II of the Chandela dynasty, known for its clean lines and preservation.",
        significance:
          "Shows early experimentation with narrative friezes depicting the Ramayana.",
        features: [
          "Ramayana panels",
          "Monolithic pillars",
          "Detailed Vishnu avatars",
          "Four-faced Vishnu idol"
        ]
      }
    },
    {
      id: 3,
      name: "Chitragupta Temple",
      description: "Rare temple dedicated to Surya (Sun God) with eastward orientation.",
      image: "/chitragupta.jpg",
      details: {
        architecture:
          "East-facing layout to capture the first rays of the sun on the Surya idol inside.",
        history:
          "Built by the Chandelas in the mid-11th century, richly carved with solar motifs.",
        significance:
          "One of the few Khajuraho temples dedicated to the Sun deity, emphasizing solar worship.",
        features: [
          "Eastward orientation",
          "Surya statue",
          "Solar chariot carvings",
          "Altar facing sunrise"
        ]
      }
    },
    {
      id: 4,
      name: "Chausath Yogini Temple",
      description:
        "Temple dedicated to 64 Yoginis—female deities representing aspects of the Divine Feminine.",
      image: "/chausath.jpg",
      details: {
        architecture:
          "Circular open-air shrine with 64 niches around the circumference.",
        history:
          "One of India’s earliest tantric shrines, built in the late 9th century.",
        significance:
          "Dedicated to Tantric worship, rare example of Yogini cult architecture.",
        features: [
          "Circular plan",
          "64 yogini niches",
          "Stone platform",
          "Agni and Shiva shrines"
        ]
      }
    }
  ],
  eastern: [
    {
      id: 5,
      name: "Parsvanath Temple",
      description: "The largest Jain temple at Khajuraho with exquisite sculptures.",
      image: "/parsavnath.jpg",
      details: {
        architecture:
          "Symmetrical layout with elaborately carved pillars and a high shikhara.",
        history:
          "Built in 960 CE by King Dhanga, stands as a testament to Jain patronage.",
        significance:
          "Important site of Jain pilgrimage, noted for its serenity and art.",
        features: [
          "Jain Tirthankara idols",
          "Lotus motifs",
          "Mandapa carvings",
          "Meditation spaces"
        ]
      }
    },
    {
      id: 6,
      name: "Adinath Temple",
      description: "Dedicated to the first Jain Tirthankara, with intricate carvings.",
      image: "/adinath.jpg",
      details: {
        architecture:
          "Compact shrine with high base and detailed exterior reliefs.",
        history:
          "Constructed around 950 CE, one of the earliest Khajuraho Jain temples.",
        significance:
          "Highlights early medieval Jain architecture in central India.",
        features: [
          "Adinath idol",
          "Floral friezes",
          "Horseshoe arches",
          "Stone canopy"
        ]
      }
    }
  ],
  southern: [
    {
      id: 7,
      name: "Duladeo Temple",
      description: "A Shiva temple known for its elegant sculptures of celestial beauties.",
      image: "/Khajuraho_Dulhadeo_2010.jpg",
      details: {
        architecture:
          "Late-phase Chandela temple with simpler plan and ornate door lintels.",
        history:
          "Built in 1000 CE, one of the last temples added to the site.",
        significance:
          "Marks the decline of Chandela artistry but retains elegance.",
        features: [
          "Shiva Lingam",
          "Celestial nymph carvings",
          "Ornate doorway",
          "Plain mandapa"
        ]
      }
    },
    {
      id: 8,
      name: "Chaturbhuj Temple",
      description: "Known for its massive carved image of Vishnu in the sanctum.",
      image: "/Chaturbhui-Temple-of-Khajuraho.jpg",
      details: {
        architecture:
          "Unfinished tower, unique rectangular plan among Khajuraho temples.",
        history:
          "Commissioned by Raja Dhanga in the late 10th century.",
        significance:
          "Houses one of India’s tallest Vishnu images (3.4m).",
        features: [
          "Huge Vishnu idol",
          "Rectangular sanctum",
          "Incomplete spire",
          "Minimal exterior carvings"
        ]
      }
    }
  ]
};

const TempleDetailModal = ({ temple, onClose }: { temple: Temple; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-[url('/temple-texture.jpg')] bg-cover bg-center bg-opacity-20 rounded-2xl shadow-xl max-w-md w-11/12 p-6 space-y-4">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white hover:text-gray-200"
      >
        <X className="w-5 h-5" />
      </button>
      <img src={temple.image} alt={temple.name} className="w-full h-32 object-cover rounded-lg" />
      <h3 className="text-xl font-semibold text-white">{temple.name}</h3>
      <p className="text-sm text-white/90">{temple.description}</p>
      <div className="bg-white bg-opacity-80 rounded-lg p-4 space-y-3 max-h-60 overflow-y-auto">
        <div>
          <h4 className="font-medium text-gray-800">Significance</h4>
          <p className="text-gray-700 text-sm">{temple.details.significance}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Architecture</h4>
          <p className="text-gray-700 text-sm">{temple.details.architecture}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">History</h4>
          <p className="text-gray-700 text-sm">{temple.details.history}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {temple.details.features.map((feat, idx) => (
              <li key={idx}>{feat}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const TempleGroups = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof templeData>("western");
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);

  return (
    <section id="temples" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#5B2C2B] mb-12">Explore Temple Groups</h2>
        <div className="flex justify-center space-x-6 mb-10">
          {Object.entries(templeData).map(([group]) => (
            <button
              key={group}
              onClick={() => setActiveTab(group as keyof typeof templeData)}
              className={`pb-2 text-lg font-medium capitalize ${
                activeTab === group ? "border-b-4 border-primary text-primary" : "text-gray-600"
              }`}
            >
              {group} Group
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templeData[activeTab].map((temple) => (
            <div
              key={temple.id}className="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden" onClick={() => setSelectedTemple(temple)}>
              <img src={temple.image} alt={temple.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{temple.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{temple.description}</p>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </div>
          ))}
        </div>
        {selectedTemple && <TempleDetailModal temple={selectedTemple} onClose={() => setSelectedTemple(null)} />}
      </div>
    </section>
  );
};

export default TempleGroups;
