
interface Filter {
  id: string;
  name: string;
  class: string;
  description: string;
}

export const filters: Filter[] = [
  {
    id: 'original',
    name: 'Original',
    class: 'saturate-100',
    description: 'No filter applied'
  },
  {
    id: 'mono',
    name: 'Mono',
    class: 'grayscale',
    description: 'Classic black and white'
  },
  {
    id: 'vivid',
    name: 'Vivid',
    class: 'saturate-150 contrast-125',
    description: 'Vibrant colors with enhanced contrast'
  },
  {
    id: 'cool',
    name: 'Cool',
    class: 'brightness-110 hue-rotate-15',
    description: 'Subtle cool tone'
  },
  {
    id: 'warm',
    name: 'Warm',
    class: 'brightness-110 sepia-[0.15]',
    description: 'Gentle warm overtones'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    class: 'sepia brightness-90 contrast-75',
    description: 'Classic retro look'
  },
  {
    id: 'dramatic',
    name: 'Dramatic',
    class: 'contrast-125 brightness-75',
    description: 'High contrast moody effect'
  },
  {
    id: 'fade',
    name: 'Fade',
    class: 'brightness-110 contrast-75 saturate-75',
    description: 'Subtle faded look'
  }
];

export const getFilterById = (id: string): Filter => {
  return filters.find(filter => filter.id === id) || filters[0];
};

