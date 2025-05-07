import { useRef, useState, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

interface CustomVideoPlayerProps {
  onClose: () => void;
  videoId?: string;
}

const CustomVideoPlayer = ({ onClose, videoId = 'YOUR_VIDEO_ID' }: CustomVideoPlayerProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube embed URL with autoplay and muted
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&fs=1&rel=0&enablejsapi=1`;

  // Handle mute/unmute using YouTube Player API
  const toggleMute = () => {
    if (iframeRef.current) {
      const message = {
        event: 'command',
        func: isMuted ? 'unMute' : 'mute',
        args: []
      };
      iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), '*');
      setIsMuted(!isMuted);
    }
  };

  // Initialize YouTube Player API
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onReady') {
            // Player is ready
            console.log('YouTube player is ready');
          }
        } catch (e) {
          console.error('Error parsing YouTube player message:', e);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full h-full">
        <iframe
          ref={iframeRef}
          title="YouTube 360 Video"
          src={embedUrl}
          allow="autoplay; fullscreen"
          allowFullScreen
          frameBorder="0"
          className="w-full h-full"
          style={{ aspectRatio: '16/9', background: 'black' }}
        />
        
        <button
          onClick={toggleMute}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/70 text-white rounded-full flex items-center gap-2 text-lg shadow-lg hover:bg-black/90 transition-all z-50"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-6 h-6 mr-2" /> Unmute
            </>
          ) : (
            <>
              <Volume2 className="w-6 h-6 mr-2" /> Mute
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomVideoPlayer; 