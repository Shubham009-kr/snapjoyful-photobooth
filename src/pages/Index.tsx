
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PhotoBooth from '../components/PhotoBooth';
import { toast } from "sonner";

const Index: React.FC = () => {
  useEffect(() => {
    // Welcome toast when the page loads
    toast("Welcome to Photobooth", {
      description: "Take amazing photos with premium filters",
      position: "bottom-center"
    });
    
    // Check if camera is available
    const checkCameraAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (videoDevices.length === 0) {
          toast.warning("No camera detected", {
            description: "Please connect a camera to use the photobooth",
            duration: 5000
          });
        }
      } catch (error) {
        console.error('Error checking camera:', error);
      }
    };
    
    checkCameraAvailability();
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <main className="pt-24 px-4 sm:px-6">
        <PhotoBooth />
      </main>
      
      <footer className="mt-24 py-8 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Photobooth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

