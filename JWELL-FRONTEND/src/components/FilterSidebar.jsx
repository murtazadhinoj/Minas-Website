import React from "react";

const FilterSidebar = ({
   showFilters,
  setShowFilters,
  filters,
  setFilters,
  products,
  filterOptions,
}) => {

  const getAnimClass = (delay) =>
    `transform transition-all duration-700 ease-out ${delay} ${
      showFilters ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`;

  const materialColors = {
    Gold: "bg-[#D4AF37]",
    Silver: "bg-[#C0C0C0]",
    "Rose Gold": "bg-[#B76E79]",
    Oxidized: "bg-gray-700",
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      metal: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
    });
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          showFilters ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShowFilters(false)}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-full md:w-[450px] bg-black text-white shadow-2xl transform transition-transform duration-700 ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">

          {/* HEADER */}
          <div className="p-8 border-b border-gray-800 flex justify-between">
            <h2 className={`tracking-widest uppercase ${getAnimClass("delay-100")}`}>
              Filters
            </h2>
            <button onClick={() => setShowFilters(false)}>✕</button> 
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10">


            {/* MATERIAL */}
<div className={getAnimClass("delay-200")}>
  <h3 className="text-xs mb-6 uppercase tracking-widest text-gray-500">
    Material
  </h3>

  <div className="space-y-3">
    {filterOptions.metals
  .filter(Boolean)
  .map((item)  => {
      const isActive = filters.metal === item;

      return (
        <label
          key={item}
          className={`
            flex items-center gap-4 p-3 rounded-lg cursor-pointer
            transition-all duration-300
            ${isActive ? "bg-white/10 ring-2 ring-white" : "hover:bg-white/5"}
          `}
        >
          <input
            type="radio"
            hidden
            checked={isActive}
            onChange={() => handleFilterChange("metal", item)}
          />
          <span
            className={`text-sm tracking-wide ${
              isActive ? "text-white font-semibold" : "text-gray-400"
            }`}
          >
            {item}
          </span>
        </label>
      );
    })}
  </div>
</div>


{/* CATEGORY */}
<div className={getAnimClass("delay-300")}>
  <h3 className="text-xs mb-6 uppercase tracking-widest text-gray-500">
    Category
  </h3>

  <div className="space-y-3">
    {filterOptions.categories
  .filter(Boolean)
  .map((item) => {
      const isActive =
        filters.category?.toLowerCase() === String(item).toLowerCase();

      return (
        <button
          key={item}
          onClick={() => handleFilterChange("category", item)}
          className={`
            w-full px-5 py-4 text-left uppercase tracking-widest text-sm
            border transition-all duration-300
            ${isActive
              ? "bg-white text-black border-white shadow-lg scale-[1.02]"
              : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"}
          `}
        >
          {item}
        </button>
      );
    })}
  </div>
</div>

<div className={getAnimClass("delay-400")}>
  <h3 className="text-xs mb-6 uppercase tracking-widest text-gray-500">
    Collection
  </h3>

  <div className="space-y-3">
    {filterOptions.collections
  .filter(Boolean)
  .map((item) => {
      const isActive =
        filters.collection?.toLowerCase() ===String(item).toLowerCase();

      return (
        <button
          key={item}
          onClick={() => handleFilterChange("collection", item)}
          className={`
            w-full px-5 py-4 text-left uppercase tracking-widest text-sm
            border transition-all duration-300
            ${isActive
              ? "bg-white text-black border-white shadow-lg scale-[1.02]"
              : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"}
          `}
        >
          {item}
        </button>
      );
    })}
  </div>
</div>

          </div>

          {/* FOOTER */}
          <div className="p-8 border-t border-gray-800 flex justify-between">
            <button onClick={clearFilters}>Clear</button>
            <button onClick={() => setShowFilters(false)}>
              View {products.length}
            </button>
          </div>

          <button
  onClick={() => setShowFilters(false)}
  className="md:hidden w-full bg-white text-black py-4 uppercase tracking-widest text-sm font-semibold rounded-lg"
>
  Apply Filters
</button>


        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
