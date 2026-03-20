import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function WhatsNew() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/new`);
        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to load new products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  if (loading) {
    return <div className="p-12 text-center">Loading new arrivals…</div>;
  }

  return (
    <div className="px-6 lg:px-16 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-light uppercase tracking-widest">
          What’s New
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Discover our latest creations
        </p>      
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-gray-500">No new products at the moment.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="cursor-pointer group"
              onClick={() => navigate(`/product/${product.slug}`)}
            >
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="text-sm uppercase tracking-wide">
                {product.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {product.price.currency} {product.price.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WhatsNew;