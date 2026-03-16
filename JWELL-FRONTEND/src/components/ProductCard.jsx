import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <Link to={`/products/${product.slug}`} className="group block no-underline">
    <div className="relative aspect-[4/5] bg-transparent overflow-hidden mb-14 flex items-center justify-center">
      <img 
        src={product.images?.[0]?.url} 
        alt={product.name}
        className="w-[65%] h-auto object-contain mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
      />

      <img 
        src={product.images?.[1]?.url || product.images?.[0]?.url} 
        alt={product.name}
        className="absolute w-[65%] h-auto object-contain mix-blend-multiply opacity-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
      />

      {!product.inventory?.inStock && (
        <div className="absolute top-4 right-4 text-[8px] font-bold tracking-widest bg-white/80 backdrop-blur-md px-3 py-1 uppercase">
          Sold Out
        </div>
      )}
    </div>

    <div className="mt-6 space-y-3 pl-6">
      <p className="text-[8px] font-medium text-gray-500 uppercase tracking-[0.35em]">
        {product.category}
      </p>
      <h3 className="text-[11px] font-light tracking-[0.4em] uppercase text-[#1a1a1a] transition-colors group-hover:text-gray-500">
        {product.name}
      </h3>
      <p className="text-[10px] font-light tracking-[0.15em] text-gray-600 mt-2">
        €{product.price.amount.toLocaleString()}
      </p>
    </div>
  </Link>
);

export default ProductCard;