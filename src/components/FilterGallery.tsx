
import React, { useState, useEffect } from 'react';
import FilterPreview from './FilterPreview';
import { filters } from '../utils/filters';

interface FilterGalleryProps {
  previewImage: string;
  selectedFilter: string;
  onFilterSelect: (filterId: string) => void;
}

const FilterGallery: React.FC<FilterGalleryProps> = ({
  previewImage,
  selectedFilter,
  onFilterSelect
}) => {
  return (
    <div className="mt-4 w-full">
      <div className="filter-selector flex gap-3 py-2 overflow-x-auto animate-fade-in">
        {filters.map((filter) => (
          <FilterPreview
            key={filter.id}
            id={filter.id}
            name={filter.name}
            filterClass={filter.class}
            previewSrc={previewImage}
            isActive={selectedFilter === filter.id}
            onClick={() => onFilterSelect(filter.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterGallery;

