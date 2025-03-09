
import React from 'react';
import { Camera } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 py-4 backdrop-blur-md bg-white/75 border-b border-gray-100 transition-all duration-300">
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="h-6 w-6 text-primary" />
          <span className="text-xl font-medium tracking-tight">Photobooth</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

