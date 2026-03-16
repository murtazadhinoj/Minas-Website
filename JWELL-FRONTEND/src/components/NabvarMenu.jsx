import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ringBanner from '../assets/imgs/ringBanner.png';
import the_watch from '../assets/imgs/the_watch.jpg';

function NavbarMenu({ closeMenu }) {

const goTo = (path) => {
  navigate(path);
  handleClose();
};


  const navigate = useNavigate();
  
  // Data State
  const [filters, setFilters] = useState({ categories: [], collections: [] });
  const [loading, setLoading] = useState(true);

  // VIEW STATE: 'MAIN', 'CATEGORIES', or 'COLLECTIONS'
  const [mobileView, setMobileView] = useState('MAIN');

  // GSAP Refs
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const menuPanelRef = useRef(null);
  
  // Mobile Layer Refs
  const mainLayerRef = useRef(null);
  const categoriesLayerRef = useRef(null);
  const collectionsLayerRef = useRef(null);

  

  // 1. Fetch Data
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/products/filters');
        const data = await res.json();
        if (data.success) {
          setFilters(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch menu filters", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilters();
  }, []);

  // 2. ENTRANCE ANIMATION (Mount)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Reset initial positions (ensure layers are off-screen)
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(menuPanelRef.current, { xPercent: -100 });
      
      // Setup Mobile Layers: Main visible, others off-screen right
      gsap.set(mainLayerRef.current, { xPercent: 0, opacity: 1 });
      gsap.set([categoriesLayerRef.current, collectionsLayerRef.current], { xPercent: 100, opacity: 1 });

      // Animate In
      tl.to(backdropRef.current, { opacity: 1, duration: 0.5 })
        .to(menuPanelRef.current, { xPercent: 0, duration: 0.8, ease: "power4.out" }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3. MOBILE VIEW NAVIGATION (The Smooth Slider)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const duration = 0.6;
      const ease = "power3.inOut";

      // Helper to animate layers
      // incoming: the ref of the layer appearing
      // outgoing: the ref of the layer disappearing
      const slideLayer = (incoming, outgoing, direction) => {
        if (!incoming.current || !outgoing.current) return;

        // Going Deeper (Main -> Category)
        if (direction === 'forward') {
          gsap.fromTo(incoming.current, { xPercent: 100 }, { xPercent: 0, duration, ease });
          gsap.to(outgoing.current, { xPercent: -30, duration, ease }); // Parallax fade out
        } 
        // Going Back (Category -> Main)
        else {
          gsap.to(incoming.current, { xPercent: 0, duration, ease });
          gsap.to(outgoing.current, { xPercent: 100, duration, ease }); // Slide back out
        }
      };

      if (mobileView === 'CATEGORIES') {
        slideLayer(categoriesLayerRef, mainLayerRef, 'forward');
      } else if (mobileView === 'COLLECTIONS') {
        slideLayer(collectionsLayerRef, mainLayerRef, 'forward');
      } else if (mobileView === 'MAIN') {
        // We need to figure out which one is open to close it
        // We simply reset both sub-layers to right and bring main from left
        gsap.to(mainLayerRef.current, { xPercent: 0, duration, ease });
        gsap.to([categoriesLayerRef.current, collectionsLayerRef.current], { xPercent: 100, duration, ease });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [mobileView]);


  // 4. EXIT ANIMATION
  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: closeMenu // Unmount after animation finishes
    });

    tl.to(menuPanelRef.current, { xPercent: -100, duration: 0.6, ease: "power3.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.4 }, "-=0.3");
  };

  // const handleNavClick = (type, value) => {
  //   const param = type === 'collection' ? 'collection' : 'category';
  //   navigate(`/home?${param}=${encodeURIComponent(value)}`);
  //   handleClose();
  // };

  const handleNavClick = (type, value) => {
  if (type === "category") {
    navigate(`/category/${encodeURIComponent(value)}`);
  } else {
    navigate(`/collection/${encodeURIComponent(value)}`);
  }

  handleClose();
};

  // --- STYLES ---
  const linkContainerStyle = "relative group/link w-fit cursor-pointer";
  const underlineStyle = "absolute left-0 -bottom-1 w-full h-[1px] bg-current transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-out origin-left";
  
  const mobileLinkStyle = "flex justify-between items-center py-5 border-b border-gray-200 text-sm font-bold uppercase tracking-widest cursor-pointer hover:bg-black/5 transition-colors";
  const mobileSubItemStyle = "block py-4 text-sm font-normal text-gray-600 hover:text-black transition-colors border-b border-gray-100";

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] overflow-hidden">
      
      {/* 1. BACKDROP */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0"
        onClick={handleClose}
      />

      {/* 2. MAIN PANEL */}
      <div 
        ref={menuPanelRef}
        className="fixed top-0 left-0 h-full w-full lg:w-[100vw] bg-[#f4f4f4] text-[#1a1a1a] shadow-2xl"
      >
        
        {/* Content Wrapper */}
        <div className="w-full h-full relative overflow-hidden">
          
          {/* Global Close Button */}
          <div className="absolute top-0 right-0 z-50 p-6">
            <button onClick={handleClose} className="p-2 group transition-transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-800 group-hover:rotate-90 transition-transform duration-500">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* =========================================================
              MOBILE VIEW SYSTEM (GSAP Controlled Layers)
              ========================================================= */}
          <div className="lg:hidden h-full relative bg-[#f4f4f4] w-full">
            
            {/* --- LAYER 1: MAIN MENU --- */}
            <div 
              ref={mainLayerRef}
              className="absolute inset-0 px-6 pt-24 pb-10 overflow-y-auto bg-[#f4f4f4] w-full"
            >
               {/* Top Links */}
               <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                  <span className="text-sm font-bold text-[#e85d4e] uppercase tracking-widest" onClick={() => goTo('/')}>Homepage</span>
                  <span className="text-sm font-bold text-gray-800 uppercase tracking-widest">Store Locator</span>
                  <span className="text-sm font-bold text-gray-800 uppercase tracking-widest">Gift Card</span>
                  <span className="text-sm font-bold text-gray-800 uppercase tracking-widest"
                   onClick={() => goTo('/contact')}>Contact us</span>
               </div>
               
               <div className="border-t border-gray-200 mb-2"></div>

               {/* Navigation Links */}
               <div className={mobileLinkStyle} onClick={() => setMobileView('CATEGORIES')}>
                  <span>Product Categories</span>
                  <ArrowRight />
               </div>

               <div className={mobileLinkStyle} onClick={() => setMobileView('COLLECTIONS')}>
                  <span>Collections</span>
                  <ArrowRight />
               </div>

               {/* Static Links */}
               {/* <div className={mobileLinkStyle} onClick={() => handleNavClick("category", "New")}><span>What's New</span></div> */}
               <div
  className={mobileLinkStyle}
  onClick={() => {
   goTo("/whats-new");
  }}
>
  <span>What's New</span>
</div>
               <div className={mobileLinkStyle} onClick={() => handleNavClick("category", "Art of Living")}><span>Art of Living</span></div>
               <div className={mobileLinkStyle} onClick={() => handleNavClick("category", "Watches")}><span>The Watch</span></div>
               <div className={mobileLinkStyle} onClick={() => handleNavClick("category", "Apparel")}><span>Apparel</span></div>
               
               {/* House of Minas */}
               <div className="mt-8 bg-gray-200 p-4 flex justify-between items-center cursor-pointer">
                  <span className="text-sm font-bold uppercase tracking-widest">House of Minas</span>
                  <ArrowRight />
               </div>

               <div className="mt-12 text-lg font-light">T. +30 210 623 3577</div>
            </div>


            {/* --- LAYER 2: PRODUCT CATEGORIES SUB-MENU --- */}
            <div 
              ref={categoriesLayerRef}
              className="absolute inset-0 bg-[#f4f4f4] px-6 pt-24 pb-10 overflow-y-auto w-full"
            >
              {/* Header */}
              <div 
                className="flex items-center gap-3 mb-8 cursor-pointer group"
                onClick={() => setMobileView('MAIN')}
              >
                <ArrowLeft />
                <span className="text-sm font-bold uppercase tracking-widest group-hover:text-gray-600 transition-colors">Product Categories</span>
              </div>
              
              <div className="border-t border-gray-300"></div>
              
              {/* List */}
              <div className="flex flex-col">
                 {loading ? <p className="py-4">Loading...</p> : filters.categories.map((cat) => (
                    <span key={cat} className={mobileSubItemStyle} onClick={() => handleNavClick('category', cat)}>
                      {cat}
                    </span>
                 ))}
              </div>
            </div>


            {/* --- LAYER 3: COLLECTIONS SUB-MENU --- */}
            <div 
              ref={collectionsLayerRef}
              className="absolute inset-0 bg-[#f4f4f4] px-6 pt-24 pb-10 overflow-y-auto w-full"
            >
              {/* Header */}
              <div 
                className="flex items-center gap-3 mb-8 cursor-pointer group"
                onClick={() => setMobileView('MAIN')}
              >
                <ArrowLeft />
                <span className="text-sm font-bold uppercase tracking-widest group-hover:text-gray-600 transition-colors">Collections</span>
              </div>
              
              <div className="border-t border-gray-300"></div>
              
              {/* List */}
              <div className="flex flex-col">
                 {loading ? <p className="py-4">Loading...</p> : filters.collections.map((col) => (
                    <span key={col} className={mobileSubItemStyle} onClick={() => handleNavClick('collection', col)}>
                      {col}
                    </span>
                 ))}
              </div>
            </div>

          </div>

          {/* =========================================================
              DESKTOP VIEW (Standard Fade In)
              ========================================================= */}
          <div className="hidden lg:block h-full overflow-y-auto bg-[#f4f4f4] animate-fadeIn">
              
               {/* Desktop Header */}
               <div className="flex justify-between items-center px-12 py-8">
                 <ul className="flex space-x-8 text-sm font-medium uppercase tracking-wider text-gray-800">
                     <li className={linkContainerStyle} onClick={() => goTo('/')}>
                         <span className="hover:text-black transition-colors">Homepage</span><span className={underlineStyle}></span>
                     </li>
                     <li className={linkContainerStyle}><span className="hover:text-black transition-colors">Gift Card</span><span className={underlineStyle}></span></li>
                     <li className={linkContainerStyle}><span className="hover:text-black transition-colors">Store Locator</span><span className={underlineStyle}></span></li>
                     <li className={linkContainerStyle}><span className="hover:text-black transition-colors"
                     onClick={() => goTo('/contact')}>Contact us</span><span className={underlineStyle}></span></li>
                 </ul>
                 <div className="w-8"></div> 
               </div>

               {/* Desktop Grid Content */}
               <div className="px-12 pb-16">
                 <div className="grid grid-cols-12 gap-8">
                   <div className="col-span-8 flex flex-col gap-12">
                     <div className="flex flex-row gap-8">
                       <div className="flex-1">
                         <h3 className="text-sm font-semibold uppercase mb-6 tracking-widest text-black">Product Categories</h3>
                         <div className="flex flex-col space-y-3 text-sm font-light text-gray-600">
                           {loading ? <p>Loading...</p> : filters.categories.map((cat) => (
                             <div key={cat} className={linkContainerStyle} onClick={() => handleNavClick('category', cat)}>
                                 <span className="hover:text-black transition-colors">{cat}</span><span className={underlineStyle}></span>
                             </div>
                           ))}
                         </div>
                       </div>
                       <div className="flex-1">
                         <h3 className="text-sm font-semibold uppercase mb-6 tracking-widest text-black">Collections</h3>
                         <div className="flex flex-col space-y-3 text-sm font-light text-gray-600">
                           {loading ? <p>Loading...</p> : filters.collections.map((col) => (
                             <div key={col} className={linkContainerStyle} onClick={() => handleNavClick('collection', col)}>
                                 <span className="hover:text-black transition-colors">{col}</span><span className={underlineStyle}></span>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>
                     <div className="w-full border-t border-gray-300"></div>
                     <div className="flex flex-row gap-8">
                       <div className="flex-1 flex flex-col">
                         {/* <CategoryRow title="WHAT'S NEW" image={ringBanner} onClick={() => handleNavClick("category", "New")} /> */}
                         <CategoryRow
  title="WHAT'S NEW"
  image={ringBanner}
  onClick={() => {
    goTo("/whats-new");
  }}
/>
                         <div className="w-full border-t border-gray-300 my-2"></div>
                         <CategoryRow title="THE WATCH" image={the_watch} onClick={() => handleNavClick("category", "Watches")} />
                       </div>
                       <div className="flex-1 flex flex-col">
                         {/* <CategoryRow title="ART OF LIVING" image="https://via.placeholder.com/60" onClick={() => handleNavClick("category", "Art of Living")} /> */}
                         <div className="w-full border-t border-gray-300 my-2"></div>
                         <CategoryRow title="APPAREL" image="https://via.placeholder.com/60" onClick={() => handleNavClick("category", "Apparel")} />
                       </div>
                     </div>
                   </div>
                   <div className="col-span-4 pl-8">
                     <div className="bg-white p-4 pb-8 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300">
                       <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-6 relative group">
                         <img src="https://via.placeholder.com/600x450" alt="Cobra Earrings" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                       </div>
                       <div className="text-center px-4">
                         <h3 className="text-lg font-medium uppercase tracking-wide mb-3">The New Cobra Earrings</h3>
                         <button className="border border-gray-200 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300">An Icon Is Born</button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// Helper Icons
const ArrowRight = () => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l4 4-4 4"/></svg>
);

const ArrowLeft = () => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 9l-4-4 4-4"/></svg>
);

function CategoryRow({ title, image, onClick }) {
  return (
    <div className="flex justify-between items-center group cursor-pointer py-3" onClick={onClick}>
      <span className="text-sm font-medium uppercase tracking-wide text-gray-900 group-hover:text-gray-600 group-hover:translate-x-2 transition-all duration-300">{title}</span>
      <div className="w-16 h-16 bg-gray-100 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
      </div>
    </div>
  );
}

export default NavbarMenu;