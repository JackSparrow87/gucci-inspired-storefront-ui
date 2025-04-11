
import { Dispatch, SetStateAction } from "react";
import { Filter } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  onFilterChange: () => void;
}

const FilterSidebar = ({ filter, setFilter, onFilterChange }: FilterSidebarProps) => {
  // Category options
  const categories = [
    { value: "clothing", label: "Clothing" },
    { value: "shoes", label: "Shoes" },
    { value: "bags", label: "Bags" },
    { value: "accessories", label: "Accessories" },
  ];
  
  // Gender options
  const genders = [
    { value: "women", label: "Women" },
    { value: "men", label: "Men" },
    { value: "unisex", label: "Unisex" },
  ];
  
  // Color options
  const colors = [
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "red", label: "Red" },
    { value: "beige", label: "Beige" },
    { value: "brown", label: "Brown" },
    { value: "navy", label: "Navy" },
    { value: "green", label: "Green" },
    { value: "multicolor", label: "Multicolor" },
  ];
  
  // Size options
  const sizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];
  
  // Price range state
  const handlePriceChange = (value: number[]) => {
    setFilter(prev => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number]
    }));
  };
  
  // Handle checkbox changes
  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilter(prev => {
      const categories = prev.category || [];
      if (checked) {
        return { ...prev, category: [...categories, category] };
      } else {
        return { ...prev, category: categories.filter(c => c !== category) };
      }
    });
  };
  
  const handleGenderChange = (gender: string, checked: boolean) => {
    setFilter(prev => {
      const genders = prev.gender || [];
      if (checked) {
        return { ...prev, gender: [...genders, gender] };
      } else {
        return { ...prev, gender: genders.filter(g => g !== gender) };
      }
    });
  };
  
  const handleColorChange = (color: string, checked: boolean) => {
    setFilter(prev => {
      const colors = prev.colors || [];
      if (checked) {
        return { ...prev, colors: [...colors, color] };
      } else {
        return { ...prev, colors: colors.filter(c => c !== color) };
      }
    });
  };
  
  const handleSizeChange = (size: string, checked: boolean) => {
    setFilter(prev => {
      const sizes = prev.sizes || [];
      if (checked) {
        return { ...prev, sizes: [...sizes, size] };
      } else {
        return { ...prev, sizes: sizes.filter(s => s !== size) };
      }
    });
  };
  
  const clearFilters = () => {
    setFilter({});
    onFilterChange();
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm underline text-gray-500 hover:text-gucci-black"
        >
          Clear All
        </button>
      </div>
      
      <Accordion type="multiple" defaultValue={["category", "gender", "price", "color", "size"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.value}`}
                    checked={filter.category?.includes(category.value) || false}
                    onCheckedChange={(checked) => {
                      handleCategoryChange(category.value, checked as boolean);
                      onFilterChange();
                    }}
                  />
                  <label 
                    htmlFor={`category-${category.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="gender">
          <AccordionTrigger className="font-medium">Gender</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {genders.map(gender => (
                <div key={gender.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`gender-${gender.value}`}
                    checked={filter.gender?.includes(gender.value) || false}
                    onCheckedChange={(checked) => {
                      handleGenderChange(gender.value, checked as boolean);
                      onFilterChange();
                    }}
                  />
                  <label 
                    htmlFor={`gender-${gender.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {gender.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger className="font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-1">
              <Slider
                defaultValue={[0, 5000]}
                max={5000}
                step={100}
                value={[
                  filter.priceRange?.[0] || 0, 
                  filter.priceRange?.[1] || 5000
                ]}
                onValueChange={handlePriceChange}
                onValueCommit={onFilterChange}
                className="mb-6"
              />
              <div className="flex justify-between text-sm">
                <span>${filter.priceRange?.[0] || 0}</span>
                <span>${filter.priceRange?.[1] || 5000}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="color">
          <AccordionTrigger className="font-medium">Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map(color => (
                <div key={color.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`color-${color.value}`}
                    checked={filter.colors?.includes(color.value) || false}
                    onCheckedChange={(checked) => {
                      handleColorChange(color.value, checked as boolean);
                      onFilterChange();
                    }}
                  />
                  <label 
                    htmlFor={`color-${color.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {color.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="size">
          <AccordionTrigger className="font-medium">Size</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sizes.map(size => (
                <div key={size.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`size-${size.value}`}
                    checked={filter.sizes?.includes(size.value) || false}
                    onCheckedChange={(checked) => {
                      handleSizeChange(size.value, checked as boolean);
                      onFilterChange();
                    }}
                  />
                  <label 
                    htmlFor={`size-${size.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {size.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
