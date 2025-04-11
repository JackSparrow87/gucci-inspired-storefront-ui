
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Product, Filter, SortOption } from "@/types";
import { filterProducts, products } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import FilterSidebar from "@/components/category/FilterSidebar";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter as FilterIcon, X } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [filter, setFilter] = useState<Filter>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  // Initial search
  useEffect(() => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }
    
    const searchQuery = query.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) || 
      product.description.toLowerCase().includes(searchQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
    );
    
    applyFiltersAndSort(results, filter, sortBy);
  }, [query]);
  
  // Apply filters and sorting
  const applyFiltersAndSort = (products: Product[], filters: Filter, sort: SortOption) => {
    // First apply filters
    let result = filterProducts(products, filters);
    
    // Then apply sorting
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case "popular":
        result = [...result].sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  };
  
  // Apply filters when filter state changes
  const handleFilterChange = () => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }
    
    const searchQuery = query.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) || 
      product.description.toLowerCase().includes(searchQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
    );
    
    applyFiltersAndSort(results, filter, sortBy);
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    
    if (!query) {
      setFilteredProducts([]);
      return;
    }
    
    const searchQuery = query.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) || 
      product.description.toLowerCase().includes(searchQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
    );
    
    applyFiltersAndSort(results, filter, value as SortOption);
  };
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl md:text-4xl font-serif text-center mb-4">Search Results</h1>
      <p className="text-center text-gray-600 mb-8">
        {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{query}"
      </p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowMobileFilter(true)}
            className="flex items-center"
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Mobile filter sidebar */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4 lg:hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Filters</h2>
              <Button 
                variant="ghost" 
                onClick={() => setShowMobileFilter(false)}
                className="p-2"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <FilterSidebar 
              filter={filter} 
              setFilter={setFilter}
              onFilterChange={handleFilterChange}
            />
            
            <div className="mt-8">
              <Button 
                className="w-full bg-gucci-black hover:bg-gucci-darkGray text-white"
                onClick={() => setShowMobileFilter(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        {/* Desktop filter sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar 
            filter={filter} 
            setFilter={setFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-end mb-6">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
