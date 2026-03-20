import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../Context/productContext';
import FilterSidebar from "../components/FilterSidebar";

// Banners & Assets
import ringBanner from "../assets/imgs/ringBanner.png";
import pendantBanner from "../assets/imgs/pendantBanner.png";
import earingBanner from "../assets/imgs/earingBanner.png";

/**
 * PRODUCTION CONSTANTS
 */
const MAX_CONTENT_WIDTH = "max-w-[1600px]";
const TRANSITION_SLOW = "duration-[1200px] ease-[cubic-bezier(0.23,1,0.32,1)]";

function HomePage() {
  const { products, isLoading, isError } = useProductContext();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ metal: "", category: "" });
  const [filterOptions, setFilterOptions] = useState({ categories: [], collections: [], metals: [] });

  // 1. Optimized Data Fetching
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/filters`);
        const { success, data } = await res.json();
        if (success) {
          setFilterOptions({
            ...data,
            metals: [...new Set(products.map(p => p.specifications?.metal).filter(Boolean))],
          });
        }
      } catch (err) {
        console.error("Filter API Error:", err);
      }
    };
    if (products.length) fetchOptions();
  }, [products]);

  // 2. Memoized Filtering for Performance
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = !filters.category || p.category.toLowerCase() === filters.category.toLowerCase();
      const matchMetal = !filters.metal || p.specifications?.metal === filters.metal;
      return matchCat && matchMetal;
    });
  }, [products, filters]);

  const getProductsByCat = useCallback((cat) => {
    return filteredProducts.filter(p => p.category.toLowerCase().includes(cat.toLowerCase())).slice(0, 4);
  }, [filteredProducts]);

  if (isError) return (
    <div className="h-screen flex items-center justify-center text-xs tracking-widest text-red-800">
      SERVICE CURRENTLY UNAVAILABLE
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#f5f3ef]  text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      {/* Dynamic Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-700">
          <p className="tracking-[0.5em] text-[10px] animate-pulse uppercase">House of Minas</p>
        </div>
      )}

      <FilterSidebar 
        showFilters={showFilters} setShowFilters={setShowFilters} 
        filters={filters} setFilters={setFilters} 
        products={filteredProducts} filterOptions={filterOptions} 
      />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-[#ebebeb]">
        <video 
          className="absolute inset-0 w-full h-full object-cover scale-105"
          autoPlay loop muted playsInline
          poster="https://via.placeholder.com/1920x1080/f7f7f7/000000"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-20 left-6 md:left-16 text-white max-w-2xl">
          <span className="block text-[10px] font-bold tracking-[0.4em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Current Campaign
          </span>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Living Being
          </h1>
          <Link to="/about" className="group relative text-[10px] font-bold tracking-[0.3em] uppercase transition-colors">
            Discover More
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white/40 group-hover:bg-white transition-colors" />
          </Link>
        </div>
      </section>

      {/* --- BRAND PHILOSOPHY --- */}
      <RevealOnScroll>
        <div className="py-40 px-6 flex justify-center">
          <div className="max-w-2xl text-center space-y-10">
            <h2 className="text-3xl md:text-4xl font-light leading-[1.2] tracking-tight">
              Studio Minas was established in Athens, 1981.
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-lg mx-auto">
              Preserving a strict manufacturing heritage where form meets identity, 
              ensuring the visionary philosophy is passed through every hand-finished piece.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* --- PRODUCT SHOWCASES --- */}
      <div className="space-y-52 pb-52">
        <CategoryShowcase 
          title="Rings" subtitle="Where form meets identity" 
          bannerImage={ringBanner} products={getProductsByCat('Ring')} 
        />
        <CategoryShowcase 
          title="Earrings" subtitle="Sculptural Elegance" 
          bannerImage={earingBanner} products={getProductsByCat('Earring')} 
        />
        <CategoryShowcase 
          title="Pendants" subtitle="Close to the heart" 
          bannerImage={pendantBanner} products={getProductsByCat('Pendant')} 
        />
      </div>

      {/* MOBILE FILTER TRIGGER */}
      <button 
        onClick={() => setShowFilters(true)}
        className="fixed bottom-10 right-10 z-50 md:hidden bg-black text-white px-8 py-4 rounded-full text-[10px] font-bold tracking-widest shadow-2xl active:scale-95 transition-transform"
      >
        FILTER
      </button>
    </div>
  );
}

/**
 * REFINED SHOWCASE COMPONENT
 */
// const CategoryShowcase = ({ title, subtitle, bannerImage, products }) => (
//   <section className={`mx-auto ${MAX_CONTENT_WIDTH} px-6 md:px-12 group/section`}>
//     <RevealOnScroll>
//       <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-[#f3f3f3]">
//         <img 
//           src={bannerImage} alt={title}
//           className={`w-full h-full object-cover transition-transform duration-[2000ms] group-hover/section:scale-105`}
//         />
//         <div className="absolute inset-0 bg-black/15" />
//         <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-white">
//           <span className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2 opacity-90">{subtitle}</span>
//           <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter uppercase mb-10">{title}</h2>
//           <Link 
//             to={`/category/${title.toLowerCase()}`}
//             className="w-fit border border-white/50 px-10 py-4 text-[10px] font-bold tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
//           >
//             EXPLORE COLLECTION
//           </Link>
//         </div>
//       </div>
//     </RevealOnScroll>

//     {/* Indented Grid Section (The "Red Arrow" Padding) */}
//     <div className="mt-16 md:mt-24 px-2 md:px-20 lg:px-32">
//       <RevealOnScroll delay={200}>
//         {products.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-16">
//             {products.map(p => <ProductCard key={p._id} product={p} />)}
//           </div>
//         ) : (
//           <div className="h-40 flex items-center justify-center border border-dashed border-gray-200 text-[10px] tracking-[0.3em] text-gray-400 uppercase">
//             New Pieces Coming Soon
//           </div>
//         )}
//       </RevealOnScroll>
//     </div>
//   </section>
// );

/**
 * REFINED SHOWCASE COMPONENT
 */
const CategoryShowcase = ({ title, subtitle, bannerImage, products }) => (
  /* Adjusted px-6 md:px-12 -> px-4 md:px-8 to push banner closer to edges */
<section className="w-full group/section">
    <RevealOnScroll>
      <div className="relative w-full h-[80vh] md:h-[95vh] overflow-hidden">
        <img 
          src={bannerImage} alt={title}
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/section:scale-105"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-white">
          <span className="text-[11px] tracking-[0.45em] font-semibold uppercase opacity-80 mb-4">{subtitle}</span>
          <h2 className="text-6xl md:text-[110px] font-extralight tracking-[-0.02em] uppercase leading-[0.9] mb-12">{title}</h2>
          <Link 
            to={`/category/${title.toLowerCase()}`}
            className="w-fit border border-white/50 px-10 py-4 text-[10px] font-bold tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </div>
    </RevealOnScroll>

    {/* IMPORTANT: 
        Because the banner is now wider, we increase the 'Red Arrow' padding 
        (md:px-24) to keep the products indented and elegant.
    */}
    <div className="bg-[#f2efe9] py-36">
  <div className="max-w-[1800px] mx-auto px-12">
      <RevealOnScroll delay={200}>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-28 md:gap-x-40 gap-y-28">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center border border-dashed border-gray-200 text-[10px] tracking-[0.3em] text-gray-400 uppercase">
            New Pieces Coming Soon
          </div>
        )}
      </RevealOnScroll>
    </div>
    </div>
  </section>
);

/**
 * LUXURY PRODUCT CARD
 */
const ProductCard = ({ product }) => (
  <Link to={`/products/${product.slug}`} className="group block no-underline">
  <div className="relative aspect-[4/5] bg-transparent overflow-hidden mb-14 flex items-center justify-center">
      {/* Primary Image */}
      <img 
        src={product.images?.[0]?.url} alt={product.name}
        className="w-[65%] h-auto object-contain mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
      />
      {/* Secondary Hover Image (Standard for Production Jewelry Sites) */}
      <img 
        src={product.images?.[1]?.url || product.images?.[0]?.url} alt={product.name}
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

/**
 * REUSABLE ANIMATION WRAPPER
 */
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.215,0.61,0.355,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default HomePage;