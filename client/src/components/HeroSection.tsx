

// import { getImageUrl } from "@/lib/utils";
// import { Calendar, Building, Landmark } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import * as bodyPix from "@tensorflow-models/body-pix";
// import "@tensorflow/tfjs";

// const backgrounds = [
//   { id: 1, url: "/kandariya.jpg", thumbnail: "/kandariya.jpg", photoArea: { x: 100, y: 100, width: 100, height: 200 } },
//   { id: 2, url: "/chausath.jpg", thumbnail: "/chausath.jpg", photoArea: { x: 150, y: 120, width: 180, height: 270 } },
// ];

// function SelfieCenter({ onClose }: { onClose: () => void }) {
//   const [selectedBg, setSelectedBg] = useState<typeof backgrounds[0] | null>(null);
//   const [photo, setPhoto] = useState<File | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const netRef = useRef<bodyPix.BodyPix | null>(null);

//   useEffect(() => { bodyPix.load().then(net => netRef.current = net); }, []);

//   useEffect(() => {
//     if (selectedBg && photo && canvasRef.current && netRef.current) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d"); if (!ctx) return;
//       const bgImg = new Image(); bgImg.src = selectedBg.url;
//       bgImg.onload = async () => {
//         canvas.width = bgImg.width; canvas.height = bgImg.height;
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(bgImg, 0, 0);
//         const photoImg = new Image();
//         photoImg.src = URL.createObjectURL(photo);
//         await new Promise(r => photoImg.onload = r);
//         const net = netRef.current!;
//         const segmentation = await net.segmentPerson(photoImg);
//         const mask = bodyPix.toMask(segmentation);
//         const tempCanvas = document.createElement("canvas");
//         tempCanvas.width = photoImg.width; tempCanvas.height = photoImg.height;
//         const tctx = tempCanvas.getContext("2d")!;
//         tctx.putImageData(mask, 0, 0);
//         tctx.globalCompositeOperation = "source-in";
//         tctx.drawImage(photoImg, 0, 0);
//         const { x, y, width, height } = selectedBg.photoArea;
//         const scale = Math.min(width / photoImg.width, height / photoImg.height);
//         const sW = photoImg.width * scale; const sH = photoImg.height * scale;
//         const dx = x + (width - sW) / 2; const dy = y + (height - sH) / 2 -20;
//         ctx.drawImage(tempCanvas, 0, 0, photoImg.width, photoImg.height, dx, dy, sW, sH);
//       };
//     }
//   }, [selectedBg, photo]);

//   const handleDownload = () => {
//     if (canvasRef.current) {
//       const dataURL = canvasRef.current.toDataURL("image/jpeg", 0.9);
//       const link = document.createElement("a"); link.href = dataURL; link.download = "selfie.jpg"; link.click();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-[National_Park]">
//       <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
//         <div className="flex justify-end p-4"><button onClick={onClose} className="text-[#5B2C2B] text-2xl">×</button></div>
//         <div className="px-8 py-4 overflow-y-auto flex-1 space-y-6">
//           <h2 className="text-2xl text-[#5B2C2B] text-center">Selfie Point</h2>
//           <div>
//             <h3 className="text-lg text-[#5B2C2B] mb-3">Choose a Background</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {backgrounds.map(bg => (
//                 <img key={bg.id} src={bg.thumbnail} alt="bg" onClick={() => setSelectedBg(bg)}
//                   className={`cursor-pointer rounded-lg border-2 hover:scale-105 transform transition ${selectedBg?.id === bg.id ? 'border-[#5B2C2B]' : 'border-transparent'}`} />
//               ))}
//             </div>
//           </div>
//           {selectedBg && (
//             <div>
//               <h3 className="text-lg text-[#5B2C2B] mb-3">Upload Your Photo</h3>
//               <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)}
//                 className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#5B2C2B]/20 file:text-[#5B2C2B] hover:file:bg-[#5B2C2B]/30" />
//             </div>
//           )}
//           {selectedBg && (
//             <div className="max-h-64 overflow-auto border border-gray-200 rounded-lg"><canvas ref={canvasRef} className="w-full h-auto" /></div>
//           )}
//         </div>
//         {selectedBg && photo && (
//           <div className="p-4"><button onClick={handleDownload}
//             className="w-full bg-[#5B2C2B] text-white py-2 rounded-lg hover:bg-[#472223] transition">
//             Download Selfie
//           </button></div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function HeroSection() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isVideoError, setIsVideoError] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSelfieModalOpen, setIsSelfieModalOpen] = useState(false);

//   useEffect(() => {
//     const video = videoRef.current; if (!video) return;
//     const handleCanPlay = () => { setIsLoading(false); video.play().catch(() => setIsVideoError(true)); };
//     const handleError = () => { setIsVideoError(true); setIsLoading(false); };
//     video.addEventListener("canplay", handleCanPlay);
//     video.addEventListener("error", handleError);
//     video.playbackRate = 0.5;
//     return () => { video.removeEventListener("canplay", handleCanPlay); video.removeEventListener("error", handleError); };
//   }, []);

//   return (
//     <section className="relative h-screen bg-black font-[National_Park]" id="hero">
//       <div className="absolute inset-0 z-0">
//         {isLoading && (<div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>)}
//         {!isVideoError ? (
//           <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover opacity-70">
//             <source src="/hero.mp4" type="video/mp4" />
//           </video>
//         ) : (
//           <img src={getImageUrl("temple-sunset")} alt="Khajuraho Temple" className="w-full h-full object-cover opacity-80" />
//         )}
//       </div>
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10"></div>
//       <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4 md:px-8">
//         <h1 className="text-6xl lg:text-7xl text-white tracking-widest uppercase mb-4">K H A J U R A H O</h1>
//         <p className="text-xl md:text-2xl text-white drop-shadow-lg max-w-3xl mx-auto mb-8">The Temples of Love and Art</p>
//         <div className="space-x-4">
//           <button onClick={() => setIsSelfieModalOpen(true)} className="px-6 py-3 bg-[#EF9651] text-white rounded-md hover:bg-[#EF9655]/80 transition">Selfie Point</button>
//           <a href="#plan" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-md border border-white/30 hover:bg-white/30 transition">Plan Your Visit</a>
//         </div>
//       </div>
//       <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
//         <div className="flex flex-wrap justify-center gap-6 text-white">
//           <div className="flex flex-col items-center"><Landmark className="h-6 w-6 mb-2" /><p className="text-sm">UNESCO World Heritage</p></div>
//           <div className="flex flex-col items-center"><Calendar className="h-6 w-6 mb-2" /><p className="text-sm">950-1050 CE</p></div>
//           <div className="flex flex-col items-center"><Building className="h-6 w-6 mb-2" /><p className="text-sm">85 Temples</p></div>
//         </div>
//       </div>
//       {isSelfieModalOpen && <SelfieCenter onClose={() => setIsSelfieModalOpen(false)} />}
//     </section>
//   );
// }


import { getImageUrl } from "@/lib/utils";
import { Calendar, Building, Landmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

const backgrounds = [
  { id: 1, url: "/kandariya.jpg", thumbnail: "/kandariya.jpg", photoArea: { x: 100, y: 100, width: 100, height: 200 } },
  { id: 2, url: "/chausath.jpg", thumbnail: "/chausath.jpg", photoArea: { x: 150, y: 120, width: 180, height: 270 } },
];

function SelfieCenter({ onClose }: { onClose: () => void }) {
  const [selectedBg, setSelectedBg] = useState<typeof backgrounds[0] | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const netRef = useRef<bodyPix.BodyPix | null>(null);

  useEffect(() => { bodyPix.load().then(net => netRef.current = net); }, []);

  useEffect(() => {
    if (selectedBg && photo && canvasRef.current && netRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d"); if (!ctx) return;
      const bgImg = new Image(); bgImg.src = selectedBg.url;
      bgImg.onload = async () => {
        canvas.width = bgImg.width;
        canvas.height = bgImg.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImg, 0, 0);
        const photoImg = new Image();
        photoImg.src = URL.createObjectURL(photo);
        await new Promise(r => photoImg.onload = r);
        // draw masked selfie at mid-bottom with fixed height ratio
        const imgHeight = canvas.height * 0.3;            // 30% of bg height
        const imgWidth = (photoImg.width / photoImg.height) * imgHeight;
        const dx = (canvas.width - imgWidth) / 2;          // center horizontally
        const dy = canvas.height - imgHeight - (canvas.height * 0.05); // margin 5%
        // segmentation & mask (optional)
        const net = netRef.current!;
        const segmentation = await net.segmentPerson(photoImg);
        const mask = bodyPix.toMask(segmentation);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = photoImg.width;
        tempCanvas.height = photoImg.height;
        const tctx = tempCanvas.getContext("2d")!;
        tctx.putImageData(mask, 0, 0);
        tctx.globalCompositeOperation = "source-in";
        tctx.drawImage(photoImg, 0, 0);
        // draw onto main canvas
        ctx.drawImage(tempCanvas, 0, 0, photoImg.width, photoImg.height, dx, dy, imgWidth, imgHeight);
      };
    }
  }, [selectedBg, photo]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL("image/jpeg", 0.9);
      const link = document.createElement("a"); link.href = dataURL; link.download = "selfie.jpg"; link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-[National_Park]">
      <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-end p-4"><button onClick={onClose} className="text-[#5B2C2B] text-2xl">×</button></div>
        {/* Scrollable Content */}
        <div className="px-8 py-4 overflow-y-auto flex-1 space-y-6">
          <h2 className="text-2xl text-[#5B2C2B] text-center font-[National_Park]">Selfie Point</h2>
          <div>
            <h3 className="text-lg text-[#5B2C2B] mb-3 font-[National_Park]">Choose a Background</h3>
            <div className="grid grid-cols-2 gap-4">
              {backgrounds.map(bg => (
                <img key={bg.id} src={bg.thumbnail} alt="bg" onClick={() => setSelectedBg(bg)}
                  className={`cursor-pointer rounded-lg border-2 hover:scale-105 transform transition ${selectedBg?.id === bg.id ? 'border-[#5B2C2B]' : 'border-transparent'}`} />
              ))}
            </div>
          </div>
          {selectedBg && (
            <div>
              <h3 className="text-lg text-[#5B2C2B] mb-3 font-[National_Park]">Upload Your Photo</h3>
              <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#5B2C2B]/20 file:text-[#5B2C2B] hover:file:bg-[#5B2C2B]/30" />
            </div>
          )}
          {selectedBg && (
            <div className="max-h-64 overflow-auto border border-gray-200 rounded-lg"><canvas ref={canvasRef} className="w-full h-auto" /></div>
          )}
        </div>
        {/* Footer */}
        {selectedBg && photo && (
          <div className="p-4">
            <button onClick={handleDownload} className="w-full bg-[#5B2C2B] text-white py-2 rounded-lg hover:bg-[#472223] transition font-[National_Park]">
              Download Selfie
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelfieModalOpen, setIsSelfieModalOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current; if (!video) return;
    const handleCanPlay = () => { setIsLoading(false); video.play().catch(() => setIsVideoError(true)); };
    const handleError = () => { setIsVideoError(true); setIsLoading(false); };
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.playbackRate = 0.5;
    return () => { video.removeEventListener("canplay", handleCanPlay); video.removeEventListener("error", handleError); };
  }, []);

  return (
    <section className="relative h-screen bg-black font-[National_Park]" id="hero">
      <div className="absolute inset-0 z-0">
        {isLoading && (<div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>)}
        {!isVideoError ? (
          <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover opacity-70">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <img src={getImageUrl("temple-sunset")} alt="Khajuraho Temple" className="w-full h-full object-cover opacity-80" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10"></div>
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4 md:px-8 font-[National_Park]">
        <h1 className="text-6xl lg:text-7xl text-white tracking-widest uppercase mb-4 font-[National_Park]">K H A J U R A H O</h1>
        <p className="text-xl md:text-2xl text-white drop-shadow-lg max-w-3xl mx-auto mb-8 font-[National_Park]">The Temples of Love and Art</p>
        <div className="space-x-4">
          <button onClick={() => setIsSelfieModalOpen(true)} className="px-6 py-3 bg-[#EF9651] text-white rounded-md hover:bg-[#EF9655]/80 transition font-[National_Park]">Selfie Point</button>
          <a href="#plan" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-md border border-white/30 hover:bg-white/30 transition font-[National_Park]">Plan Your Visit</a>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center font-[National_Park]">
        <div className="flex flex-wrap justify-center gap-6 text-white">
          <div className="flex flex-col items-center"><Landmark className="h-6 w-6 mb-2" /><p className="text-sm font-[National_Park]">UNESCO World Heritage</p></div>
          <div className="flex flex-col items-center"><Calendar className="h-6 w-6 mb-2" /><p className="text-sm font-[National_Park]">950-1050 CE</p></div>
          <div className="flex flex-col items-center"><Building className="h-6 w-6 mb-2" /><p className="text-sm font-[National_Park]">85 Temples</p></div>
        </div>
      </div>
      {isSelfieModalOpen && <SelfieCenter onClose={() => setIsSelfieModalOpen(false)} />}
//     </section>
  );
}
