import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';
import { useLocation } from 'wouter';

const TeaserVideo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showExploreButton, setShowExploreButton] = useState(true);
  const [showYouTubeVideo, setShowYouTubeVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.error('Video element not found');
      return;
    }

    console.log('Video element found, adding event listeners');

    const handleEnded = () => {
      console.log('Video ended');
      setIsVisible(false);
      setLocation('/');
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [setLocation]);

  const handleExplore = () => {
    setShowYouTubeVideo(true);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVisible(false);
    setLocation('/');
  };

  if (!isVisible && !showYouTubeVideo) return null;

  if (showYouTubeVideo) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black pointer-events-auto">
        <iframe
        style={{ pointerEvents: 'auto' }}
  className="w-full h-full"
  src="https://www.youtube.com/embed/i8LTDFomR8o?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1"
  title="Khajuraho Virtual Tour"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
  allowFullScreen
/>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 gap-4">
          <button
            onClick={() => {
              setShowYouTubeVideo(false);
              setLocation('/');
            }}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all group"
          >
            <span className="flex items-center gap-2">
              Explore More
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>
        <button
          onClick={() => {
            setShowYouTubeVideo(false);
            setLocation('/');
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all group"
        >
          <div className="flex items-center gap-2">
            <SkipForward className="w-6 h-6" />
            <span className="w-0 group-hover:w-[140px] transition-all duration-300 whitespace-nowrap overflow-hidden">
              Skip to main content
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        controls={false}
        preload="auto"
      >
        <source src="/Khajuraho-treaser.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-4 right-4 flex flex-col gap-4">
        <button
          onClick={toggleSound}
          className="group relative p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all overflow-hidden"
        >
          <div className="flex items-center gap-2">
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
            <span className="w-0 group-hover:w-[100px] transition-all duration-300 whitespace-nowrap overflow-hidden">
              {isMuted ? 'Unmute' : 'Mute'}
            </span>
          </div>
        </button>

        <button
          onClick={handleSkip}
          className="group relative p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all overflow-hidden"
        >
          <div className="flex items-center gap-2">
            <SkipForward className="w-6 h-6" />
            <span className="w-0 group-hover:w-[140px] transition-all duration-300 whitespace-nowrap overflow-hidden">
              Skip to main content
            </span>
          </div>
        </button>
      </div>

      {showExploreButton && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <button
            onClick={handleExplore}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all group"
          >
            <span className="flex items-center gap-2">
              Explore Khajuraho
            </span>
          </button>
          
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeaserVideo; 


// import { useState, useEffect, useRef } from 'react';
// import { Volume2, VolumeX, SkipForward, Map } from 'lucide-react';
// import { useLocation } from 'wouter';

// const TeaserVideo = () => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [isMuted, setIsMuted] = useState(true);
//   const [showExploreButton, setShowExploreButton] = useState(true);
//   const [showYouTubeVideo, setShowYouTubeVideo] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [, setLocation] = useLocation();

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) {
//       console.error('Video element not found');
//       return;
//     }

//     const handleEnded = () => {
//       setIsVisible(false);
//       setLocation('/');
//     };

//     const handleError = (e: Event) => {
//       console.error('Video error:', e);
//     };

//     video.addEventListener('ended', handleEnded);
//     video.addEventListener('error', handleError);

//     return () => {
//       video.removeEventListener('ended', handleEnded);
//       video.removeEventListener('error', handleError);
//     };
//   }, [setLocation]);

//   const handleExplore = () => {
//     setShowYouTubeVideo(true);
//   };

//   const toggleSound = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleSkip = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//     }
//     setIsVisible(false);
//     setLocation('/');
//   };

//   if (!isVisible && !showYouTubeVideo) return null;

//   if (showYouTubeVideo) {
//     return (
//       <div className="fixed inset-0 z-[9999] bg-black">
//         <iframe
//           className="w-full h-full"
//           src="https://www.youtube.com/embed/i8LTDFomR8o?autoplay=1&mute=0&controls=0&rel=0&showinfo=0&modestbranding=1&playsinline=1&iv_load_policy=3&fs=1&origin=http://localhost:3000"
//           title="Khajuraho Virtual Tour"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         />
//               <div className="absolute bottom-8 right-8">
//         <button
//           onClick={handleSkip}
//           className="group px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
//         >
//           <Map className="w-5 h-5" />
//           <span className="group-hover:translate-x-1 transition-transform">Explore More</span>
//         </button>
//       </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 z-[9999] bg-black">
//       <video
//         ref={videoRef}
//         className="w-full h-full object-cover"
//         autoPlay
//         muted
//         playsInline
//         controls={false}
//         preload="auto"
//       >
//         <source src="/Khajuraho-treaser.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       <div className="absolute top-4 right-4 flex flex-col gap-4">
//         {/* Mute / Unmute button */}
//         <button
//           onClick={toggleSound}
//           className="group relative p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all overflow-hidden"
//         >
//           <div className="flex items-center gap-2">
//             {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
//             <span className="w-0 group-hover:w-[100px] transition-all duration-300 whitespace-nowrap overflow-hidden">
//               {isMuted ? 'Unmute' : 'Mute'}
//             </span>
//           </div>
//         </button>
//       </div>

//       {/* Bottom center explore Khajuraho button */}
//       {showExploreButton && (
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
//           <button
//             onClick={handleExplore}
//             className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all group"
//           >
//             <span className="flex items-center gap-2">Explore Khajuraho</span>
//           </button>

//           <div className="animate-bounce">
//             <svg
//               className="w-8 h-8 text-white/80"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 14l-7 7m0 0l-7-7m7 7V3"
//               />
//             </svg>
//           </div>
//         </div>
//       )}

//       {/* New bottom-right "Explore More" button */}

//     </div>
//   );
// };

// export default TeaserVideo;
