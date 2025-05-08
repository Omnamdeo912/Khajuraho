import { getImageUrl } from "@/lib/utils";
import { Calendar, Building, Landmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const backgrounds = [
  {
    id: 1,
    url: "/kandariya.jpg",
    thumbnail: "/kandariya.jpg",
    photoArea: { x: 100, y: 100, width: 100, height: 200 },
  },
  {
    id: 2,
    url: "/chausath.jpg",
    thumbnail: "/chausath.jpg",
    photoArea: { x: 150, y: 120, width: 180, height: 270 },
  },
];

const SelfieCenter = ({ onClose }: { onClose: () => void }) => {
  const [selectedBg, setSelectedBg] = useState(null);
  const [photo, setPhoto] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedBg && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const bgImg = new Image();
      bgImg.src = selectedBg.url;
      bgImg.onload = () => {
        canvas.width = bgImg.width;
        canvas.height = bgImg.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImg, 0, 0);

        if (photo) {
          const photoImg = new Image();
          photoImg.src = URL.createObjectURL(photo);
          photoImg.onload = () => {
            const { x, y, width, height } = selectedBg.photoArea;
            const scale = Math.min(width / photoImg.width, height / photoImg.height);
            const scaledW = photoImg.width * scale;
            const scaledH = photoImg.height * scale;
            const drawX = x + (width - scaledW) / 2;
            const drawY = y + (height - scaledH) / 2;

            // Add shadow for natural blending
            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.shadowBlur = 10;
            ctx.drawImage(photoImg, drawX, drawY, scaledW, scaledH);
            ctx.shadowBlur = 0; // Reset shadow
          };
        }
      };
    }
  }, [selectedBg, photo]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "selfie.jpg";
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Selfie Point</h2>

        {/* Background Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Choose a Background</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {backgrounds.map((bg) => (
              <img
                key={bg.id}
                src={bg.thumbnail}
                alt={`Background ${bg.id}`}
                className={`w-full h-32 object-cover cursor-pointer rounded-lg border-2 ${
                  selectedBg?.id === bg.id ? "border-blue-500" : "border-transparent"
                } hover:border-blue-300`}
                onClick={() => setSelectedBg(bg)}
              />
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        {selectedBg && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Upload Your Photo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        )}

        {/* Display Composited Image */}
        <canvas
          ref={canvasRef}
          className="w-full max-w-full h-auto border border-gray-300 rounded-lg mb-4"
        />

        {/* Download Button */}
        {selectedBg && photo && (
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full"
          >
            Download Selfie
          </button>
        )}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelfieModalOpen, setIsSelfieModalOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch((error) => {
        console.error("Error playing video:", error);
        setIsVideoError(true);
      });
    };

    const handleError = () => {
      console.error("Error loading video");
      setIsVideoError(true);
      setIsLoading(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Set initial playback rate
    video.playbackRate = 0.5;

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <section className="relative h-[100vh] bg-black" id="hero">
      <div className="absolute inset-0 z-0">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        {!isVideoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-68"
          >
            <source src="/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={getImageUrl("temple-sunset")}
            alt="Khajuraho Temple"
            className="w-full h-full object-cover opacity-80"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10"></div>
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4 md:px-8">
        <h1 className="font-['National_Park'] text-6xl md:text-6xl lg:text-7xl text-white tracking-[0.2em] uppercase mb-4">
          K H A J U R A H O
        </h1>
        <p className="font-['National_Park'] text-xl md:text-2xl text-white text-shadow max-w-3xl mx-auto mb-8">
          The Temples of Love and Art
        </p>
        <div className="space-x-4">
        <button
            onClick={() => setIsSelfieModalOpen(true)}
            className="inline-block px-6 py-3 bg-[#EF9651] text-white font-medium rounded-md hover:bg-[#EF9655]/200 transition-colors"
          >
            Selfie Point
          </button>
          <a
            href="#plan"
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-md border border-white/30 hover:bg-white/20 transition-colors"
          >
            Plan Your Visit
          </a>
          {/* <button
            onClick={() => setIsSelfieModalOpen(true)}
            className="inline-block px-6 py-3 bg-[#EF9651] text-white font-medium rounded-md hover:bg-green-600 transition-colors"
          >
            Selfie Point
          </button> */}
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex flex-wrap justify-center gap-6 text-white">
          <div className="flex flex-col items-center">
            <Landmark className="h-6 w-6 mb-2" />
            <p className="text-sm">UNESCO World Heritage</p>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="h-6 w-6 mb-2" />
            <p className="text-sm">950-1050 CE</p>
          </div>
          <div className="flex flex-col items-center">
            <Building className="h-6 w-6 mb-2" />
            <p className="text-sm">85 Temples</p>
          </div>
        </div>
      </div>
      {isSelfieModalOpen && <SelfieCenter onClose={() => setIsSelfieModalOpen(false)} />}
    </section>
  );
};

export default HeroSection;