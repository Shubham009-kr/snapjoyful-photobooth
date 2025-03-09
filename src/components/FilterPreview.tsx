
import React from 'react';

interface FilterPreviewProps {
  id: string;
  name: string;
  filterClass: string;
  previewSrc: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterPreview: React.FC<FilterPreviewProps> = ({
  id,
  name,
  filterClass,
  previewSrc,
  isActive,
  onClick
}) => {
  return (
    <div 
      className={`filter-preview relative flex-shrink-0 cursor-pointer transition-all duration-300 rounded-lg overflow-hidden 
                border-2 ${isActive ? 'border-primary active' : 'border-transparent'}`}
      onClick={onClick}
    >
      <div className="w-20 h-20 relative">
        <img 
          src={previewSrc} 
          alt={`${name} filter preview`} 
          className={`w-full h-full object-cover ${filterClass}`}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent 
                    p-1 text-xs text-white text-center font-medium">
        {name}
      </div>
    </div>
  );
};

export default FilterPreview;

