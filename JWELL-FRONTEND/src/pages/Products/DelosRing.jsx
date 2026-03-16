import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import { useCartContext } from '../../Context/cartContext';

// --- ICONS ---
const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);
const ChevronUp = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
);

// --- HELPER COMPONENT: BUTTON WITH DIRECTIONAL FILL ---
const DirectionalButton = ({ children, onClick, isActive }) => {
  const buttonRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // If active (dropdown open), lock state to "filled"
    if (isActive) {
      gsap.to(circleRef.current, { scale: 2.5, duration: 0.4, ease: "power2.out" });
      gsap.to(textRef.current, { color: "#ffffff", duration: 0.2 });
    } else {
      // If inactive, ensure it resets (unless hovering, handled by events)
      gsap.to(circleRef.current, { scale: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(textRef.current, { color: "#000000", duration: 0.2 });
    }
  }, [isActive]);

  const handleMouseEnter = (e) => {
    if (isActive) return; // Already full, skip animation

    const parent = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - parent.left;
    const y = e.clientY - parent.top;

    // 1. Move circle center to mouse position instantly
    gsap.set(circleRef.current, { x, y, xPercent: -50, yPercent: -50 });
    
    // 2. Expand circle to fill button
    gsap.to(circleRef.current, { scale: 2.5, duration: 0.5, ease: "power2.out" });
    
    // 3. Change text color
    gsap.to(textRef.current, { color: "#ffffff", duration: 0.3 });
  };

  const handleMouseLeave = (e) => {
    if (isActive) return; // Keep full if active

    const parent = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - parent.left;
    const y = e.clientY - parent.top;

    // 1. Move circle to exit point while shrinking
    gsap.to(circleRef.current, { x, y, scale: 0, duration: 0.4, ease: "power2.in" });
    
    // 2. Revert text color
    gsap.to(textRef.current, { color: "#000000", duration: 0.3 });
  };

  return (
    <button 
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-1 p-4 border border-black overflow-hidden group"
    >
      {/* The Animated Circle Background */}
      <div 
        ref={circleRef} 
        className="absolute bg-black rounded-full w-[200%] h-[200%] top-0 left-0 pointer-events-none scale-0"
      />
      
      {/* Content Layer (Must be z-10 to sit on top) */}
      <div ref={textRef} className="relative z-10 flex justify-between items-center text-[11px] tracking-widest uppercase w-full">
        {children}
      </div>
    </button>
  );
};

// --- MAIN COMPONENT ---
const getMetalGradient = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('gold') && lower.includes('rose')) return 'bg-gradient-to-br from-[#E6C1B6] to-[#D68F82]';
  if (lower.includes('gold')) return 'bg-gradient-to-br from-[#DFC988] to-[#B08D46]';
  return 'bg-gradient-to-br from-[#E0E0E0] to-[#757575]';
};

function DelosRing() {
  const { slug } = useParams();
  const { addToCart } = useCartContext();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeUnit, setSizeUnit] = useState('EU');

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${slug}`);
        setProduct(res.data.product);
        setSelectedColor(res.data.product.variants.colors[0]);
        setSelectedSize(res.data.product.variants.sizes[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getSingleProduct();
  }, [slug]);

  const toggleDropdown = (type) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center uppercase tracking-widest">Loading...</div>;
  if (!product) return <div className="flex h-screen items-center justify-center uppercase tracking-widest">Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price.amount,
      image: product.images?.[0]?.url,
      color: selectedColor.code,
      size: selectedSize,
      quantity: quantity,
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white font-sans text-[#1a1a1a]">
      
      {/* LEFT: IMAGES */}
      <div className="w-full md:w-1/2 flex flex-col items-center gap-4 p-4 md:p-10 overflow-y-auto">
        {product.images?.map((img, index) => (
          <div key={index} className="w-full aspect-square flex items-center justify-center mb-10">
            <img 
              src={img.url} 
              alt={`${product.name} view ${index + 1}`} 
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-700" 
            />
          </div>
        ))}
      </div>

      {/* RIGHT: DETAILS */}
      <div className="w-full md:w-1/2 md:sticky md:top-0 md:h-screen flex flex-col justify-center px-6 py-12 md:px-20 lg:px-32">
        
        <div className="mb-10">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2 block border-b w-fit border-black">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-1">
            {product.name}
          </h1>
          <p className="text-[11px] tracking-widest text-gray-400 uppercase">
            Designed in {product.designedYear || '1984'}
          </p>
        </div>

        {/* --- ANIMATED BUTTONS --- */}
        <div className="flex gap-2 w-full mb-6">
          
          <DirectionalButton 
            isActive={activeDropdown === 'color'}
            onClick={() => toggleDropdown('color')}
          >
            <span>{activeDropdown === 'color' ? 'SELECT MATERIAL' : selectedColor?.name}</span>
            <span>{activeDropdown === 'color' ? <ChevronUp /> : <ChevronDown />}</span>
          </DirectionalButton>

          <DirectionalButton 
            isActive={activeDropdown === 'size'}
            onClick={() => toggleDropdown('size')}
          >
             <span>{activeDropdown === 'size' ? 'SELECT SIZE' : selectedSize}</span>
             <span>{activeDropdown === 'size' ? <ChevronUp /> : <ChevronDown />}</span>
          </DirectionalButton>
          
        </div>

        <div className="mb-8">
           <a href="#" className="text-[11px] underline tracking-widest text-black hover:text-gray-600">
             Download ring size guide
           </a>
        </div>

        {/* MATERIAL SWATCHES */}
        {activeDropdown === 'color' && (
          <div className="mb-8 animate-fadeIn">
            <div className="flex flex-col gap-4">
              {product.variants.colors.map((c) => (
                <div 
                  key={c.code} 
                  onClick={() => { setSelectedColor(c); setActiveDropdown(null); }}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-full shadow-inner border border-gray-200 ${getMetalGradient(c.name)} group-hover:scale-110 transition-transform`}></div>
                  <span className={`text-[11px] tracking-widest uppercase ${selectedColor?.code === c.code ? 'font-bold' : 'font-normal'}`}>
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIZE GRID */}
        {activeDropdown === 'size' && (
          <div className="mb-8 animate-fadeIn">
            <div className="flex gap-6 mb-4 border-b border-transparent">
              <button 
                onClick={() => setSizeUnit('EU')}
                className={`pb-1 text-[11px] font-bold tracking-widest ${sizeUnit === 'EU' ? 'border-b border-black' : 'text-gray-400'}`}
              >
                EU
              </button>
              <button 
                onClick={() => setSizeUnit('US')}
                className={`pb-1 text-[11px] font-bold tracking-widest ${sizeUnit === 'US' ? 'border-b border-black' : 'text-gray-400'}`}
              >
                US
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.variants.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSelectedSize(s); setActiveDropdown(null); }}
                  className={`
                    h-10 border rounded flex items-center justify-center text-[11px] hover:border-black transition-all
                    ${selectedSize === s ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'}
                  `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between border border-gray-300 p-4">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-xl px-4 hover:scale-125 transition-transform">−</button>
            <span className="text-sm tracking-widest">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="text-xl px-4 hover:scale-125 transition-transform">+</button>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white p-5 flex justify-between items-center group transition-all duration-500 hover:bg-[#333]"
          >
            <span className="text-[12px] tracking-[0.3em] font-light">ADD TO CART</span>
            <span className="text-[12px] tracking-widest">€{product.price.amount.toFixed(2)}</span>
          </button>
        </div>

        <div className="mt-10 flex gap-10 border-t border-gray-100 pt-6">
          <button className="text-[10px] tracking-[0.2em] uppercase border-b border-transparent hover:border-black pb-1 transition-all">Description</button>
          <button className="text-[10px] tracking-[0.2em] uppercase border-b border-transparent hover:border-black pb-1 transition-all">Care Instructions</button>
        </div>

      </div>
    </div>
  );
}

export default DelosRing;