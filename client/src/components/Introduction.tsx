import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/lib/utils";


const timelineData = [
  {
    year: "885 CE",
    title: "Rise of the Chandela Dynasty",
    description: "Yashovarman established the Chandela dynasty, laying the foundation for Khajuraho's architectural and cultural zenith.",
    color: "#C9A64D",
    videos: [
      { title: "Yashovarman of Jejakabhukti: Chandela Dynasty History", url: "https://www.youtube.com/watch?v=qUp7kun3uFQ" },
      { title: "Khajuraho Kingdom of Chandela, Madhya Pradesh", url: "https://www.youtube.com/watch?v=u6mgnE50egk" },
      { title: "Dhanga Deva: Chandela Dynasty of Jejakabhukti", url: "https://www.youtube.com/watch?v=I26WeCKbj4g" }
    ]
  },
  {
    year: "930 CE",
    title: "Construction of Lakshmana Temple",
    description: "Commissioned by King Yashovarman, this temple exemplifies early Nagara-style architecture with intricate carvings.",
    color: "#C1440E",
    videos: [
      { title: "Lakshmana Temple, Khajuraho 360-Degree View", url: "https://www.youtube.com/watch?v=oi2qqWdzFiU" },
      { title: "Khajuraho Lakshmana Temple Sculptures", url: "https://www.youtube.com/watch?v=Y-p5HvsGnlM" },
      { title: "Lakshmana Temple, Khajuraho Madhya Pradesh", url: "https://www.youtube.com/watch?v=5pl7L9PaCXg" }
    ]
  },
  {
    year: "1025–1050 CE",
    title: "Kandariya Mahadev Temple Built",
    description: "Under King Vidyadhara, the largest and most ornate temple dedicated to Shiva was constructed, showcasing architectural brilliance.",
    color: "#5B2C2C",
    videos: [
      { title: "Kandariya Mahadeva Temple 360-Degree Video", url: "https://www.youtube.com/watch?v=N87raB2XxJ8" },
      { title: "Kandariya Mahadev Temple, Khajuraho Tour", url: "https://www.youtube.com/watch?v=F4zyf-kJfPQ" },
      { title: "Khajuraho Temples: Kandariya Mahadeva", url: "https://www.youtube.com/watch?v=Hlk9RO46gLA" }
    ]
  },
  {
    year: "850–1050 CE",
    title: "Architectural Pinnacle of Nagara Style",
    description: "Khajuraho's temples epitomize the Nagara architectural style, characterized by towering shikharas, intricate carvings, and symmetrical layouts, influencing temple designs across northern India.",
    color: "#A0522D",
    videos: [
      { title: "Nagara Architecture in Khajuraho Temples", url: "https://www.youtube.com/watch?v=3zUIFAXutd8" },
      { title: "Khajuraho Temple Architecture Explained", url: "https://www.youtube.com/watch?v=Hlk9RO46gLA" },
      { title: "Indian Temple Architecture: Nagara Style", url: "https://www.youtube.com/watch?v=zvjWqCVG8Hc" }
    ]
  },
  {
    year: "1050–1100 CE",
    title: "Jain Temples Flourish",
    description: "The rise of Jain influence led to the construction of temples like Parshvanath and Adinath, known for their detailed sculptures.",
    color: "#2A3C6F",
    videos: [
      { title: "Khajuraho Jain Temples and Sound Show", url: "https://www.youtube.com/watch?v=sYXcsIhX2gc" },
      { title: "Jain Group of Temples: Khajuraho Series", url: "https://www.youtube.com/watch?v=Odzs3YDqaNo" },
      { title: "Khajuraho Jain Temples Complete Tour 2022", url: "https://www.youtube.com/watch?v=fFON2GibVzE" }
    ]
  },
  {
    year: "12th Century",
    title: "Decline of Chandela Power",
    description: "Political shifts and invasions led to the decline of Chandela influence, resulting in the abandonment of many temples.",
    color: "#708238",
    videos: [
      { title: "Qutb Ud Din Aibak: Slave Dynasty History", url: "https://www.youtube.com/watch?v=Q6F22wQ1_Ho" },
      { title: "Bharat: Chandela Dynasty Overview", url: "https://www.youtube.com/watch?v=pP90Ajo0RaI" },
      { title: "Khajuraho Kingdom of Chandela, Madhya Pradesh", url: "https://www.youtube.com/watch?v=u6mgnE50egk" }
    ]
  },
  {
    year: "1838 CE",
    title: "Rediscovery by British Surveyors",
    description: "Captain T.S. Burt's rediscovery of the overgrown temple complex brought global attention to these architectural marvels.",
    color: "#8A8D8F",
    videos: [
      { title: "Discovery of Khajuraho: T.S. Burt Part-01", url: "https://www.youtube.com/watch?v=9Z3p9iojgLw" },
      { title: "Khajuraho Temples: Amazing Places 4K", url: "https://www.youtube.com/watch?v=gWN_SiTKRtk" },
      { title: "Bharat: Chandela Dynasty Overview", url: "https://www.youtube.com/watch?v=pP90Ajo0RaI" }
    ]
  },
  {
    year: "1986 CE",
    title: "UNESCO World Heritage Status",
    description: "Khajuraho's temples were recognized for their cultural significance, ensuring their preservation for future generations.",
    color: "#DCC7AA",
    videos: [
      { title: "Khajuraho Videos, Madhya Pradesh, India", url: "https://www.youtube.com/watch?v=UrVBVcd5rEU" },
      { title: "Khajuraho Temples: Amazing Places 4K", url: "https://www.youtube.com/watch?v=gWN_SiTKRtk" },
      { title: "Exploring Strange Temples in Khajuraho", url: "https://www.youtube.com/watch?v=6vT7z-Eml_4" }
    ]
  }
];
const Introduction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const [selectedVideos, setSelectedVideos] = useState<{ title: string; url: string }[] | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoClick = (videos: { title: string; url: string }[], index: number) => {
    setSelectedVideos(videos);
    setActiveTimelineItem(index);
    setCurrentVideoIndex(0);
  };

  const closeVideo = () => {
    setSelectedVideos(null);
    setActiveTimelineItem(null);
    setCurrentVideoIndex(0);
  };

  const nextVideo = () => {
    if (selectedVideos) {
      setCurrentVideoIndex((prev) => (prev + 1) % selectedVideos.length);
    }
  };

  const prevVideo = () => {
    if (selectedVideos) {
      setCurrentVideoIndex((prev) => (prev - 1 + selectedVideos.length) % selectedVideos.length);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with texture */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/kdm.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            filter: "brightness(0.9)"
          }}
        />
        {/* Gradient overlay for bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-white/90 to-white/0" />
        <div className="absolute top0-0 left-0 right-0 h-[10%] bg-gradient-to-b from-white/80 to-white/0" />

      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#5B2C2B]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#5B2C2B]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        > 
          <h2 className="font-['National_Park'] text-[#5B2C2C] text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            K H A J U R A H O 
          </h2>
          <p className="font-['National_Park'] text-[#2E2E2E] text-xl max-w-3xl mx-auto">
            Where Stones Whisper Stories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-[#C1440E]" />
              <p className="font-['National_Park'] text-[#2E2E2E] text-lg leading-relaxed">
  Tucked in the heart of Madhya Pradesh, Khajuraho is a timeless masterpiece, where stone breathes stories of divine devotion and human artistry. Crafted by the Chandela dynasty from the 9th to 12th centuries, this UNESCO World Heritage Site dazzles with temples that blend soaring Nagara architecture with intricate sculptures, celebrating spirituality, sensuality, and the essence of life. Khajuraho stands as India's cultural jewel, inviting all to uncover its eternal legacy through vivid immersive 3D exploration.
</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  title: "Nagara Architecture",
                  description: "Soaring shikharas and intricate carvings, with temples rising like cosmic mountains.",
                },
                {
                  title: "Sacred Geometry",
                  description: "Perfect symmetry and mathematical precision that embody cosmic harmony.",
                },
                {
                  title: "Sculptural Mastery",
                  description: "Thousands of detailed carvings depict divine beings, & celestial dancers.",
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                  className="bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  {/* <div className="text-3xl mb-3">{item.icon}</div> */}
                  <h3 className="font-['National_Park'] text-[#5B2C2C] text-md font-bold mb-2">{item.title}</h3>
                  <p className="font-['National_Park'] text-[#2E2E2E] text-sm leading-tight">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="sketchfab-embed-wrapper w-full h-[400px]">
                <iframe 
                  title="Temple" 
                  frameBorder="0" 
                  allowFullScreen 
                  allow="autoplay; fullscreen; xr-spatial-tracking" 
                  xr-spatial-tracking 
                  execution-while-out-of-viewport 
                  execution-while-not-rendered 
                  web-share 
                  src="https://sketchfab.com/models/dd99586619e74f24b8dec10cc009c360/embed?autostart=1&preload=1&ui_theme=dark&ui_controls=0&ui_infos=0&ui_inspector=0&ui_watermark=0&ui_annotations=0"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E2E2E]/70 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Timeline Section */}
        <div className="mt-24">
          <h3 className="font-['National_Park'] text-[#5B2C2C] text-5xl text-center mb-12">
            <span className="relative inline-block">
              <span className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">Evolution of Khajuraho</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/70 blur-sm rounded-lg -z-10"></div>
            </span>
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#DCC7AA]/30" />
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full z-10 transition-all duration-300"
                    style={{ 
                      backgroundColor: item.color,
                      transform: activeTimelineItem === index ? 'translateX(-50%) scale(1.2)' : 'translateX(-50%) scale(1)',
                      boxShadow: activeTimelineItem === index ? `0 0 20px ${item.color}` : 'none'
                    }}
                  />
                  
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <motion.div 
                      className="bg-white/95 p-6 rounded-lg shadow-lg border border-[#DCC7AA] transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      style={{ 
                        borderColor: item.color,
                        boxShadow: activeTimelineItem === index ? `0 0 20px ${item.color}40` : 'none'
                      }}
                    >
                      <div className="font-['National_Park'] text-[#5B2C2C] text-xl mb-2">{item.year}</div>
                      <h4 className="font-['National_Park'] text-2xl font-bold mb-2" style={{ color: item.color }}>{item.title}</h4>
                      <p className="font-['National_Park'] text-[#2E2E2E] mb-4">{item.description}</p>
                      <button
                        onClick={() => handleVideoClick(item.videos, index)}
                        className="inline-flex items-center text-sm text-[#5B2C2C] hover:text-[#C1440E] transition-colors"
                      >
                        <span className="mr-2">Watch Documentaries</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </button>
                    </motion.div>
                  </div>

                  {/* Video Panel */}
                  <AnimatePresence>
                    {selectedVideos && activeTimelineItem === index && (
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        transition={{ duration: 0.3 }}
                        className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}
                      >
                        <motion.div 
                              >
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-['National_Park'] text-xl text-[#5B2C2C]">{selectedVideos[currentVideoIndex].title}</h3>
                            <button
                              onClick={closeVideo}
                              className="text-[#5B2C2C] hover:text-[#C1440E] transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="relative w-full aspect-video">
                            <iframe
                              src={selectedVideos[currentVideoIndex].url.replace('watch?v=', 'embed/')}
                              title={selectedVideos[currentVideoIndex].title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full rounded-lg"
                            />
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <button
                              onClick={prevVideo}
                              className="flex items-center text-[#5B2C2C] hover:text-[#C1440E] transition-colors"
                            >
                              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Previous
                            </button>
                            <div className="flex space-x-2">
                              {selectedVideos.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentVideoIndex(idx)}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    idx === currentVideoIndex ? 'bg-[#C1440E]' : 'bg-[#DCC7AA]'
                                  }`}
                                />
                              ))}
                            </div>
                            <button
                              onClick={nextVideo}
                              className="flex items-center text-[#5B2C2C] hover:text-[#C1440E] transition-colors"
                            >
                              Next
                              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
