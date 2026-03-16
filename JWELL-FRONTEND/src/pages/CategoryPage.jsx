import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const params = useParams();
const category = params.category;
const collection = params.collection;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

const [filters, setFilters] = useState({
  metal: "",
  category: category || "",
  collection: collection || "",
  minPrice: "",
  maxPrice: "",
  inStock: false,
});


const [filterOptions, setFilterOptions] = useState({
  metals: [],
  categories: [],
  collections: [],
});


useEffect(() => {
  setFilters(prev => ({
    ...prev,
    category: category || "",
    collection: collection || ""
  }));
}, [category, collection]);


useEffect(() => {
  const fetchFilterOptions = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products/filters");
      const data = await res.json();
      if (data.success) {
        setFilterOptions({
          metals: data.data.metals || [],
          categories: data.data.categories || [],
          collections: data.data.collections || [],
        });
      }
    } catch (err) {
      console.error("Failed to fetch filter options");
    }
  };

  fetchFilterOptions();
}, []);

  // useEffect(() => {
  //  fetch(`http://localhost:8080/api/products?category=${encodeURIComponent(category)}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setProducts(data.products || []);
  //       setLoading(false);
  //     });
  // }, [category]);

//   useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:8080/api/products?category=${encodeURIComponent(category)}`
//       );

//       const data = await res.json();

//       if (data.success) {
//         setProducts(data.products || []);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProducts();
// }, [category]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== false) {
          params.append(key, value);
        }
      });

      const res = await fetch(
        `http://localhost:8080/api/products?${params.toString()}`
      );

      const data = await res.json();

      if (data.success) {
        setProducts(data.products || []);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [filters]);

  if (loading) return <p>Loading...</p>;

if (!loading && products.length === 0) {

  return (
    <div className="px-8 py-20">
      <h1 className="text-4xl uppercase tracking-widest mb-12">
        {category}
      </h1>
      <p className="text-gray-500">No products found in this category.</p>
    </div>
  );
}


  return (
    <>
    <FilterSidebar
  showFilters={showFilters}
  setShowFilters={setShowFilters}
  filters={filters}
  setFilters={setFilters}
  products={products}
  filterOptions={filterOptions}
/>

  
    <div className="px-8 py-20">
      {/* <h1 className="text-4xl uppercase tracking-widest mb-12">
        {category}
      </h1> */}

<div className="flex justify-between items-center mb-12">
  <h1 className="text-4xl uppercase tracking-widest">
    {filters.category || filters.collection}
  </h1>

  <button
    onClick={() => setShowFilters(true)}
    className="border px-6 py-2 text-xs uppercase tracking-widest"
  >
    Filter
  </button>
</div>

      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product._id}>
            <img
  src={product.images?.[0]?.url || "/placeholder.jpg"}
  alt={product.name}
  className="w-full h-auto object-cover"
/>
            <p>{product.name}</p>
          </div>
        ))}
      </div> */}

      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {products.map(product => (
    <Link
      key={product._id}
      to={`/products/${product.slug}`}
      className="group block"
    >
      <div className="overflow-hidden">
        <img
          src={product.images?.[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-sm tracking-widest uppercase group-hover:text-gray-500 transition-colors">
        {product.name}
      </p>
    </Link>
  ))}
</div> */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-24">
  {products.map(product => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>

    </div>
    </>
  );
}

export default CategoryPage;
