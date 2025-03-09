
import React, { useState, useEffect } from 'react';
import Camera from './Camera';
import FilterGallery from './FilterGallery';
import { filters } from '../utils/filters';
import { toast } from "sonner";

const PhotoBooth: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('original');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    // Set default placeholder image for filter previews
    const img = new Image();
    img.src = currentImage || '';
    img.onload = () => setImageLoaded(true);
  }, [currentImage]);

  const handlePhotoCapture = (photoData: string) => {
    setCurrentImage(photoData);
    toast.success('Photo captured!');
  };

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    const filter = filters.find(f => f.id === filterId);
    if (filter) {
      toast(`${filter.name} filter applied`);
    }
  };

  return (
    <div className="photobooth-container animate-fade-in">
      <div className="max-w-5xl mx-auto mt-16">
        <div className="mb-16 text-center animate-slide-in">
          <h2 className="text-sm uppercase tracking-wider text-primary/80 font-medium mb-2">Capture the moment</h2>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Premium Photobooth Experience
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take high-quality photos, apply stunning filters, and share your creations instantly
          </p>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-6 animate-scale-in">
            <div>
              <h3 className="text-xl font-semibold mb-2">Take Your Photo</h3>
              <p className="text-muted-foreground">
                Position yourself in the frame and click the camera button. A 3-second countdown will begin.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Apply Filters</h3>
              <p className="text-muted-foreground">
                Browse through our collection of premium filters and find the perfect style for your photo.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Save or Share</h3>
              <p className="text-muted-foreground">
                Download your creation or share it directly with friends and family.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col items-center animate-slide-in">
            <Camera 
              onPhotoCapture={handlePhotoCapture} 
              selectedFilter={selectedFilter} 
            />
            
            {currentImage && (
              <FilterGallery 
                previewImage={currentImage} 
                selectedFilter={selectedFilter} 
                onFilterSelect={handleFilterSelect} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoBooth;

