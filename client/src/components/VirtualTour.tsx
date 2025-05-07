import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    name: "Kandariya Mahadev Temple",
    location: "Western Complex",
    image: "/kandariya.jpg",
    coordinates: { lat: 24.8515, lng: 79.9255 },
    panoramaUrl: "https://panoraven.com/en/embed/BswxViG1DM"
  },
  {
    id: 2,
    name: "Lakshmana Temple",
    location: "Western Complex",
    image: "/kdm.png",
    coordinates: { lat: 24.8520, lng: 79.9245 },
    panoramaUrl: "https://panoraven.com/en/embed/BswxViG1DM"
  },
  {
    id: 3,
    name: "Chitragupta Temple",
    location: "Western Complex",
    image: "/kdm.png",
    coordinates: { lat: 24.8510, lng: 79.9235 },
    panoramaUrl: "https://panoraven.com/en/embed/BswxViG1DM"
  }
];

const VirtualTour = () => {
  const [activeTour, setActiveTour] = useState(tourOptions[0]);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section id="virtualtour" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Immersive Virtual Tours</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the magnificent temples of Khajuraho with interactive 360° virtual tours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* YouTube iframe embed for the tour */}
            <iframe
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/i8LTDFomR8o?si=691OJdkucIUUcuEV"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-lg shadow-lg mb-6"
            />

            {/* Embedded 360° Virtual Tour */}
            <iframe
              width="100%"
              height="500px"
              src={activeTour.panoramaUrl}
              title={`${activeTour.name} 360° Tour`}
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
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
                      onClick={() => {
                        setActiveTour(tour);
                        setShowModal(true);
                      }}
                    >
                      <img
                        src={tour.image}
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
            </div>
          </div>
        </div>

        {/* Modal with Iframe */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="font-display font-bold text-2xl mb-4">{activeTour.name} 360° Tour</h3>
              <iframe
  src="https://panoraven.com/en/embed/xipKRcBt41"
  width="90%"
  height="500px"
  allowFullScreen={true}
  allow="accelerometer; magnetometer; gyroscope"
  style={{
    display: "block",
    margin: "20px auto",
    border: "0 none",
    maxWidth: "880px",
    borderRadius: "8px",
    boxShadow:
      "0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)",
  }}
  title="360° View"
/>
              <div className="flex justify-end mt-4">
                <Button onClick={closeModal}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VirtualTour;
