
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from "sonner";

interface UseCameraProps {
  onPhotoCapture?: (image: string) => void;
}

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  photo: string | null;
  isLoading: boolean;
  isCameraReady: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => void;
  error: string | null;
}

export function useCamera({ onPhotoCapture }: UseCameraProps = {}): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Stop any existing stream
      if (streamRef.current) {
        stopCamera();
      }
      
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
          setIsLoading(false);
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please make sure you have given permission.');
      setIsLoading(false);
      toast.error('Camera access denied. Please check your permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraReady(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isCameraReady) {
      toast.error('Camera is not ready yet.');
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame to the canvas
    const context = canvas.getContext('2d');
    if (context) {
      // Flip the image horizontally to correct for mirror effect
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Reset transformation matrix
      context.setTransform(1, 0, 0, 1, 0, 0);
      
      // Get the data URL and set the photo
      const dataUrl = canvas.toDataURL('image/png');
      setPhoto(dataUrl);
      
      // Call the callback if provided
      if (onPhotoCapture) {
        onPhotoCapture(dataUrl);
      }
    }
  }, [isCameraReady, onPhotoCapture]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    canvasRef,
    photo,
    isLoading,
    isCameraReady,
    startCamera,
    stopCamera,
    capturePhoto,
    error
  };
}

