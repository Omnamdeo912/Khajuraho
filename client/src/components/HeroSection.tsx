import { getImageUrl } from "@/lib/utils";
import { Calendar, Building, Landmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch(error => {
        console.error("Error playing video:", error);
        setIsVideoError(true);
      });
    };

    const handleError = () => {
      console.error("Error loading video");
      setIsVideoError(true);
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Set initial playback rate
    video.playbackRate = 0.5;

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
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
          <a
            href="#virtualtour"
            className="inline-block px-6 py-3 bg-[#EF9651] text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Virtual Tour
          </a>
          <a
            href="#plan"
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-md border border-white/30 hover:bg-white/20 transition-colors"
          >
            Plan Your Visit
          </a>
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
    </section>
  );
};

export default HeroSection;
