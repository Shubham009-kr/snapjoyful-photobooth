
import React, { useState, useEffect } from 'react';
import { Camera as CameraIcon, Download, RefreshCw, Share2 } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import CountdownTimer from './CountdownTimer';
import { toast } from "sonner";
import { getFilterById } from '../utils/filters';

interface CameraProps {
  onPhotoCapture: (photoData: string) => void;
  selectedFilter: string;
}

const Camera: React.FC<CameraProps> = ({ onPhotoCapture, selectedFilter }) => {
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [showFlash, setShowFlash] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const { 
    videoRef, 
    canvasRef, 
    photo, 
    isLoading, 
    isCameraReady,
    startCamera, 
    stopCamera, 
    capturePhoto, 
    error 
  } = useCamera({
    onPhotoCapture: (image) => {
      setCapturedImage(image);
      onPhotoCapture(image);
    }
  });

  // Start camera on component mount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const handleCapture = () => {
    setIsCounting(true);
  };

  const handleCountdownComplete = () => {
    setIsCounting(false);
    // Show flash effect
    setShowFlash(true);
    setTimeout(() => {
      capturePhoto();
      setShowFlash(false);
    }, 150);
  };

  const handleReset = () => {
    setCapturedImage(null);
  };

  const handleDownload = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `photobooth-${new Date().getTime()}.png`;
      link.click();
      toast.success('Photo downloaded successfully!');
    }
  };

  const handleShare = async () => {
    if (capturedImage && navigator.share) {
      try {
        // Convert data URL to blob
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        const file = new File([blob], 'photobooth-image.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'My Photobooth Picture',
          files: [file]
        });
        toast.success('Photo shared successfully!');
      } catch (error) {
        console.error('Error sharing photo:', error);
        toast.error('Could not share photo');
      }
    } else {
      toast.error('Sharing is not supported on this browser');
    }
  };

  const filterClass = getFilterById(selectedFilter).class;

  return (
    <div className="camera-container">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-6 z-10">
          <CameraIcon className="w-12 h-12 mb-4 text-red-500" />
          <h3 className="text-xl font-bold mb-2">Camera Error</h3>
          <p className="text-center mb-4">{error}</p>
          <button 
            onClick={() => startCamera()}
            className="px-4 py-2 bg-primary rounded-full text-white font-medium"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Video feed or captured image */}
      {capturedImage ? (
        <img 
          src={capturedImage} 
          alt="Captured" 
          className={`w-full h-full object-cover ${filterClass}`}
        />
      ) : (
        <video 
          ref={videoRef} 
          className={`camera-feed ${filterClass}`}
          autoPlay 
          playsInline 
          muted
        />
      )}
      
      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Countdown overlay */}
      {isCounting && (
        <CountdownTimer 
          seconds={3} 
          onComplete={handleCountdownComplete} 
          onCancel={() => setIsCounting(false)}
        />
      )}
      
      {/* Flash effect */}
      <div className={`photo-flash ${showFlash ? 'animate-capture-flash' : ''}`}></div>
      
      {/* Camera controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center">
        <div className="glass-panel rounded-full p-4 flex items-center space-x-4">
          {capturedImage ? (
            <>
              <button 
                onClick={handleReset}
                className="bg-white/80 rounded-full p-3 shadow-lg transition-transform hover:scale-105"
              >
                <RefreshCw className="w-6 h-6 text-primary" />
              </button>
              <button 
                onClick={handleDownload}
                className="bg-white/80 rounded-full p-3 shadow-lg transition-transform hover:scale-105"
              >
                <Download className="w-6 h-6 text-primary" />
              </button>
              <button 
                onClick={handleShare}
                className="bg-white/80 rounded-full p-3 shadow-lg transition-transform hover:scale-105"
              >
                <Share2 className="w-6 h-6 text-primary" />
              </button>
            </>
          ) : (
            <button 
              onClick={handleCapture}
              disabled={!isCameraReady || isLoading}
              className={`bg-white rounded-full p-4 shadow-lg transform transition-transform 
                        ${isCameraReady && !isLoading ? 'hover:scale-105 active:scale-95' : 'opacity-70'}`}
            >
              <CameraIcon className="w-8 h-8 text-primary" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Camera;

