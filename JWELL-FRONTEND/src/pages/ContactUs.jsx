import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const mainContainerRef = useRef(null);
  
  // Refs for animations
  const heroTextRef = useRef(null);
  const locationRefs = useRef([]);

  // Data for the stores to make adding more easy
  const locations = [
    {
      id: 'kifissia',
      name: 'KIFISSIA',
      type: 'FLAGSHIP STORE',
      address: ['8, Emmanouil Benaki St.', '14561 Kifissia, Athens - GR'],
      phone: '+30 210 6233 577',
      email: 'gallery@minas-designs.com',
      hours: [
        { days: 'MONDAY | WEDNESDAY | SATURDAY', time: '10:00 - 15:00' },
        { days: 'TUESDAY | THURSDAY | FRIDAY', time: '10:00 - 21:00' }
      ],
      image: 'https://images.unsplash.com/photo-1541512416146-36a88c27aa78?q=80&w=2074&auto=format&fit=crop', // Placeholder for store interior
      mapLink: '#'
    },
    {
      id: 'mykonos',
      name: 'MYKONOS',
      type: 'ISLAND',
      address: ['Agia Kyriaki Square', '84600 Mykonos Town - GR'],
      phone: '+30 22890 27320',
      email: 'gallery@minas-designs.com',
      extraInfo: 'OPEN APRIL - OCTOBER',
      hours: [
        { days: 'EVERYDAY', time: '11:00 am - 1:00 am' }
      ],
      image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?q=80&w=2070&auto=format&fit=crop', // Placeholder for Mykonos store
      mapLink: '#'
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero Text Animation (On Load)
      gsap.from(heroTextRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });

      // 2. Location Rows Animation (On Scroll)
      locationRefs.current.forEach((el, index) => {
        const textSide = el.querySelector('.location-text');
        const imageSide = el.querySelector('.location-image');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 75%", // Animation starts when top of element hits 75% of viewport
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        });

        tl.from(textSide, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        })
        .from(imageSide, {
          scale: 1.1, // Subtle zoom out effect
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.8"); // Overlap animation
      });

    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  // Helper function to push refs to array
  const addToRefs = (el) => {
    if (el && !locationRefs.current.includes(el)) {
      locationRefs.current.push(el);
    }
  };

  return (
    <div ref={mainContainerRef} className="w-full bg-[#f4f4f4] text-[#1a1a1a] font-sans">
      
      {/* --- HERO SECTION --- */}
      {/* Using a dark textured background similar to the screenshot */}
      <div className="relative h-[60vh] w-full bg-[#111] overflow-hidden flex items-end pb-16 px-6 md:px-12">
        {/* Background Image/Texture */}
        <div className="absolute inset-0 opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
             alt="Background Texture" 
             className="w-full h-full object-cover grayscale"
           />
        </div>
        
        <div ref={heroTextRef} className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-widest text-white uppercase mb-4">
            Contact Us
          </h1>
          <p className="text-[10px] md:text-[11px] tracking-[0.2em] text-gray-300 uppercase leading-relaxed max-w-md">
            Whether you're looking for product details, order inquiries, or personal assistance - reach your Minas advisors happy to hear from you.
          </p>
        </div>
      </div>

      {/* --- LOCATIONS GRID --- */}
      <div className="flex flex-col">
        {locations.map((loc, index) => (
          <div 
            key={loc.id} 
            ref={addToRefs}
            className="flex flex-col md:flex-row w-full min-h-[80vh] border-b border-gray-200 last:border-0"
          >
            
            {/* TEXT COLUMN */}
            <div className="location-text w-full md:w-1/2 bg-white flex flex-col justify-center items-center text-center p-12 md:p-20 order-2 md:order-1">
              
              {/* Header */}
              <h2 className="text-2xl font-light tracking-[0.2em] uppercase mb-2">{loc.name}</h2>
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-12 block border-b border-black pb-1">
                {loc.type}
              </span>

              {/* Hours */}
              <div className="mb-10 space-y-2">
                {loc.hours.map((h, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[10px] tracking-widest text-gray-500 uppercase">{h.days}</span>
                    <span className="text-sm font-medium tracking-wide">{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="mb-8 space-y-1">
                {loc.address.map((line, i) => (
                  <p key={i} className="text-sm tracking-wide text-gray-800">{line}</p>
                ))}
              </div>

              {/* Contact */}
              <div className="mb-8 flex flex-col gap-1">
                <a href={`tel:${loc.phone}`} className="text-sm tracking-wide hover:text-gray-500 transition-colors">{loc.phone}</a>
                <a href={`mailto:${loc.email}`} className="text-sm tracking-wide hover:text-gray-500 transition-colors">{loc.email}</a>
              </div>

               {/* Extra Info (e.g., Seasonal Openings) */}
               {loc.extraInfo && (
                <p className="text-[10px] tracking-widest text-[#e85d4e] uppercase mb-8">
                  {loc.extraInfo}
                </p>
              )}

              {/* Button */}
              <a 
                href={loc.mapLink}
                className="mt-4 px-8 py-4 border border-gray-300 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-500"
              >
                View on Google Maps
              </a>

            </div>

            {/* IMAGE COLUMN */}
            <div className="location-image w-full md:w-1/2 h-[50vh] md:h-auto overflow-hidden relative order-1 md:order-2">
              <img 
                src={loc.image} 
                alt={`${loc.name} Store`} 
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ContactUs;