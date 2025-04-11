
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-medium">No products found</h2>
        <p className="text-gray-500 mt-2">Try changing your filters or search terms.</p>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
