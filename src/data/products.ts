
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Interlocking G Wool Jacket",
    description: "Wool jacket featuring the Interlocking G motif. The pattern is created using a jacquard technique with a combination of dark green and beige thread.",
    price: 2800,
    category: "clothing",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1974&auto=format&fit=crop"
    ],
    colors: ["green", "beige"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["jackets", "wool", "luxury"],
    isNew: true,
    isFeatured: true
  },
  {
    id: "2",
    name: "GG Marmont Medium Bag",
    description: "The GG Marmont medium shoulder bag has a softly structured shape and an oversized flap closure with Double G hardware.",
    price: 2290,
    category: "bags",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1974&auto=format&fit=crop"
    ],
    colors: ["black", "red", "beige"],
    tags: ["bags", "leather", "luxury"],
    isNew: false,
    isFeatured: true
  },
  {
    id: "3",
    name: "Square G Horsebit Loafer",
    description: "Presented in black leather, these loafers are defined by the Square G Horsebit. The distinctive symbol comes from the House's archives.",
    price: 890,
    category: "shoes",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1935&auto=format&fit=crop"
    ],
    colors: ["black", "brown"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    tags: ["shoes", "leather", "formal"],
    isNew: false,
    isFeatured: true
  },
  {
    id: "4",
    name: "GG Multicolor Wool Cardigan",
    description: "Presented on the Fall/Winter 2020 runway, this cardigan showcases one of the collection's key multicolor patterns.",
    price: 1800,
    category: "clothing",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop"
    ],
    colors: ["multicolor"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["knitwear", "wool", "luxury"],
    isNew: true,
    isFeatured: true
  },
  {
    id: "5",
    name: "Ace Embroidered Sneaker",
    description: "The Ace sneaker with Interlocking G and star embroidery, a subtle reference to the House's historical symbols.",
    price: 650,
    category: "shoes",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1935&auto=format&fit=crop"
    ],
    colors: ["white"],
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    tags: ["shoes", "sneakers", "casual"],
    isNew: false,
    isFeatured: true
  },
  {
    id: "7",
    name: "GG Wool Scarf",
    description: "Wool scarf with the iconic GG motif all over. The scarf is made of a soft wool, perfect for colder weather.",
    price: 390,
    category: "accessories",
    gender: "unisex",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623249913048-7d7848fcba78?q=80&w=1974&auto=format&fit=crop"
    ],
    colors: ["navy", "beige"],
    tags: ["scarves", "wool", "winter"],
    isNew: false,
    isFeatured: false
  },
  {
    id: "8",
    name: "Horsebit 1955 Shoulder Bag",
    description: "Shoulder bag in smooth leather, defined by the Horsebit detail that references the equestrian world and heritage of the brand.",
    price: 2500,
    category: "bags",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1971&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop"
    ],
    colors: ["beige", "brown", "black"],
    tags: ["bags", "leather", "luxury"],
    isNew: true,
    isFeatured: true
  },
  {
    id: "9",
    name: "Men's GG Wool Sweater",
    description: "Wool sweater with the GG motif throughout. A combination of retro influences with the iconic GG pattern.",
    price: 1200,
    category: "clothing",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop"
    ],
    colors: ["navy", "red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["knitwear", "wool", "sweaters"],
    isNew: false,
    isFeatured: false
  },
  {
    id: "10",
    name: "Ophidia GG Small Shoulder Bag",
    description: "Small shoulder bag in GG Supreme canvas with the vintage Web stripe and Double G hardware.",
    price: 1450,
    category: "bags",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1971&auto=format&fit=crop"
    ],
    colors: ["beige", "brown"],
    tags: ["bags", "canvas", "crossbody"],
    isNew: false,
    isFeatured: false
  },
  {
    id: "11",
    name: "GG Diamond Cotton Jacket",
    description: "Cotton jacket with the GG diamond pattern all over. The sporty silhouette is contrasted by the classic motif.",
    price: 2200,
    category: "clothing",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1974&auto=format&fit=crop"
    ],
    colors: ["navy", "cream"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["jackets", "cotton", "casual"],
    isNew: true,
    isFeatured: false
  },
  {
    id: "12",
    name: "Women's Tweed Dress",
    description: "Tweed dress with contrast trim detail. The dress is cut for a streamlined silhouette with subtle A-line shape.",
    price: 2700,
    category: "clothing",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520263115673-610416f52ab6?q=80&w=1934&auto=format&fit=crop"
    ],
    colors: ["multicolor"],
    sizes: ["XS", "S", "M", "L"],
    tags: ["dresses", "tweed", "luxury"],
    isNew: true,
    isFeatured: true
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getProductsByGender = (gender: string): Product[] => {
  if (gender === 'all') return products;
  return products.filter(product => product.gender === gender || product.gender === 'unisex');
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const filterProducts = (
  products: Product[],
  {
    category,
    gender,
    priceRange,
    colors,
    sizes,
    tags
  }: {
    category?: string[];
    gender?: string[];
    priceRange?: [number, number];
    colors?: string[];
    sizes?: string[];
    tags?: string[];
  }
): Product[] => {
  return products.filter(product => {
    // Filter by category
    if (category && category.length > 0 && !category.includes(product.category)) {
      return false;
    }
    
    // Filter by gender
    if (gender && gender.length > 0 && !gender.includes(product.gender || 'unisex') && !gender.includes('unisex')) {
      return false;
    }
    
    // Filter by price range
    if (priceRange && (product.price < priceRange[0] || product.price > priceRange[1])) {
      return false;
    }
    
    // Filter by colors
    if (colors && colors.length > 0 && product.colors && 
        !product.colors.some(color => colors.includes(color))) {
      return false;
    }
    
    // Filter by sizes
    if (sizes && sizes.length > 0 && product.sizes && 
        !product.sizes.some(size => sizes.includes(size))) {
      return false;
    }
    
    // Filter by tags
    if (tags && tags.length > 0 && product.tags && 
        !product.tags.some(tag => tags.includes(tag))) {
      return false;
    }
    
    return true;
  });
};
