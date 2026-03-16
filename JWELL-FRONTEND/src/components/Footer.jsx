import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  
  // State for API data
  const [dynamicLinks, setDynamicLinks] = useState({ categories: [], collections: [] });
  const [loading, setLoading] = useState(true);

  // 1. Fetch Categories & Collections from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/products/filters');
        const data = await res.json();
        
        if (data.success) {
          setDynamicLinks(data.data);
        }
      } catch (err) {
        console.error("Failed to load footer links", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // 2. Navigation Handler (Same as Navbar)
  const handleNavClick = (type, value) => {
    const param = type === 'collection' ? 'collection' : 'category';
    // Navigate to Home with filter, scroll to top
    navigate(`/home?${param}=${encodeURIComponent(value)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 px-6 md:px-12 border-t border-gray-800">
      
      {/* --- TOP SECTION: GRID LAYOUT --- */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

        {/* COLUMN 1: BRAND & NEWSLETTER */}
        <div className="flex flex-col space-y-8 pr-8">
          <h2 className="text-2xl font-serif tracking-widest">LOGO</h2>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Crafting timeless pieces that celebrate strength, elegance, and the art of modern living.
          </p>
          
          {/* Newsletter Input */}
          <div className="flex flex-col space-y-4 pt-4">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subscribe to our newsletter</label>
            <div className="flex border-b border-gray-600 focus-within:border-white transition-colors duration-300 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent w-full outline-none text-sm placeholder-gray-600 text-white"
              />
              <button className="text-xs uppercase font-bold tracking-widest hover:text-gray-400 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 2: SHOP (DYNAMIC CATEGORIES) - The part from your yellow circle */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">Shop Categories</h3>
          <ul className="space-y-4">
            {loading ? (
              <p className="text-xs text-gray-600">Loading...</p>
            ) : (
              dynamicLinks.categories.map((cat) => (
                <FooterLink 
                  key={cat} 
                  text={cat} 
                  onClick={() => handleNavClick('category', cat)} 
                />
              ))
            )}
          </ul>
        </div>

        {/* COLUMN 3: COLLECTIONS (DYNAMIC COLLECTIONS) - The part from your yellow circle */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">Collections</h3>
          <ul className="space-y-4">
            {loading ? (
              <p className="text-xs text-gray-600">Loading...</p>
            ) : (
              dynamicLinks.collections.map((col) => (
                <FooterLink 
                  key={col} 
                  text={col} 
                  onClick={() => handleNavClick('collection', col)} 
                />
              ))
            )}
          </ul>
        </div>

        {/* COLUMN 4: CUSTOMER CARE (STATIC) */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">Customer Care</h3>
          <ul className="space-y-4">
            <FooterLink text="Contact Us" />
            <FooterLink text="Shipping & Returns" />
            <FooterLink text="Size Guide" />
            <FooterLink text="Store Locator" />
            <FooterLink text="FAQ" />
          </ul>
        </div>

      </div>

      {/* --- BOTTOM SECTION: LEGAL & SOCIAL --- */}
      <div className="max-w-[1400px] mx-auto border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright */}
        <div className="text-xs text-gray-500 font-light tracking-wide">
          &copy; {new Date().getFullYear()} All Stars. All rights reserved.
        </div>

        {/* Social Icons (SVGs) */}
        <div className="flex space-x-6 items-center">
          <SocialIcon type="instagram" />
          <SocialIcon type="facebook" />
          <SocialIcon type="pinterest" />
        </div>

        {/* Legal Links */}
        <div className="flex space-x-6 text-xs text-gray-500 font-light uppercase tracking-wider">
          <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
          <span className="cursor-pointer hover:text-white transition-colors">Terms of Use</span>
        </div>

      </div>
    </footer>
  );
}

// --- HELPER COMPONENT: LINK WITH ANIMATION ---
// This creates the smooth "underline reveal" animation on hover
function FooterLink({ text, onClick }) {
  return (
    <li 
      onClick={onClick} 
      className="w-fit cursor-pointer group relative overflow-hidden"
    >
      <span className="text-sm font-light text-gray-300 transition-colors duration-300 group-hover:text-white">
        {text}
      </span>
      {/* The Animated Line */}
      <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"></span>
    </li>
  );
}

// --- HELPER: SOCIAL ICONS ---
function SocialIcon({ type }) {
  // Simple SVG placeholders - replace with actual paths if desired
  return (
    <div className="w-5 h-5 text-gray-500 cursor-pointer hover:text-white hover:scale-110 transition-all duration-300">
      {type === 'instagram' && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      )}
      {type === 'facebook' && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      )}
      {type === 'pinterest' && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"></path><path d="M12 2v20"></path></svg>
      )}
    </div>
  )
}

export default Footer;