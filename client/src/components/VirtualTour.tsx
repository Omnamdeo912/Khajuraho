
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Pannellum } from "pannellum-react";

interface TourOption {
  id: number;
  name: string;
  location: string;
  image: string;
  coordinates: { lat: number; lng: number };
  panoramaUrl: string;
}

const tourOptions: TourOption[] = [
  {
    id: 1,
    name: "Kandariya Mahadeva Temple",
    location: "Western Complex",
    image: "/kandariya.jpg",
    coordinates: { lat: 24.853207, lng: 79.919702 },
    panoramaUrl: "/kandariya360-re.jpg" // Ensure this image is in the public folder and optimized
  },
  {
    id: 2,
    name: "Lakshmana Temple",
    location: "Western Complex",
    image: "/kdm.png",
    coordinates: { lat: 24.8524, lng: 79.9217 },
    panoramaUrl: "https://pannellum.org/images/alma.jpg" // Placeholder; replace with actual image URL
  },
  {
    id: 3,
    name: "Chitragupta Temple",
    location: "Western Complex",
    image: "/kdm.png",
    coordinates: { lat: 24.8543,  lng: 79.9201 },
    panoramaUrl: "https://pannellum.org/images/alma.jpg" // Placeholder; replace with actual image URL
  },
  {
    id: 4,
    name: "Vishvanatha Temple",
    location: "Western Complex",
    image: "/kdm.png",
    coordinates: { lat: 24.8533, lng: 79.9223 },
    panoramaUrl: "https://pannellum.org/images/alma.jpg" // Placeholder; replace with actual image URL
  },
  {
    id: 5,
    name: "Entry/Exit",
    location: "Western Complex",
    image: "/kdm.png",
    coordinates: { lat: 24.8521, lng: 79.9230 },
    panoramaUrl: "https://pannellum.org/images/alma.jpg" // Placeholder; replace with actual image URL
  }
];

const VirtualTour = () => {
  const [activeTour, setActiveTour] = useState<TourOption | null>(null);
  const [showModal, setShowModal] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Leaflet map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([24.8525, 79.9218], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Add draggable markers
      tourOptions.forEach((tour) => {
        const marker = L.marker([tour.coordinates.lat, tour.coordinates.lng], {
          draggable: true
        }).addTo(mapRef.current!);

        // Update popup content
        const updatePopup = () => {
          const latlng = marker.getLatLng();
          marker.bindPopup(
            `<b>${tour.name}</b><br>${tour.location}<br>` +
            `Coordinates: ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}<br>` +
            `<button class="copy-btn bg-green-500 text-white px-2 py-1 rounded mt-2" onclick="navigator.clipboard.writeText('${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}')">Copy Coordinates</button><br>` +
            `<a href="#" onclick="document.dispatchEvent(new CustomEvent('openPanorama', {detail: {id: ${tour.id}}}))">View Panorama</a>`
          ).openPopup();
        };

        updatePopup();
        marker.on("dragend", updatePopup);
      });
    }

    // Handle panorama click from map
    const handleOpenPanorama = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      const tour = tourOptions.find((t) => t.id === id);
      if (tour) {
        setActiveTour(tour);
        setShowModal(true);
      }
    };

    document.addEventListener("openPanorama", handleOpenPanorama);
    return () => {
      document.removeEventListener("openPanorama", handleOpenPanorama);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setActiveTour(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="text-white py-8 shadow-lg">
        <h1 className="text-4xl font-bold text-[#5B2C2B] text-center mb-4">Khajuraho Virtual Tour</h1>
        <p className="text-center text-[#5B2C2B] mt-2 text-lg italic">Explore the Western Group of Temples in 360°</p>
      </header>
      <main className="container mx-auto p-4">
        {/* Map Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Interactive Map</h2>
          <div ref={mapContainerRef} className="h-[500px] w-full rounded-lg shadow-lg" />
        </section>
      </main>
      {/* Modal for Panorama */}
      {showModal && activeTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-semibold mb-4">{activeTour.name}</h3>
            <div className="w-full h-[80vh]">
              <Pannellum
                width="100%"
                height="100%"
                image={activeTour.panoramaUrl}
                pitch={0}
                yaw={0}
                hfov={110}
                autoLoad
                showControls
                onError={(err: Error) => console.error("Panorama loading error:", err)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTour;