import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  // States for filters
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract unique categories from products for filter options
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Category-specific brands mapping
  const categoryBrands = {
    'electronics': [
      'HP', 'Dell', 'Samsung', 'Apple', 'Lenovo', 
      'Acer', 'Asus', 'Redmi', 'Infinix', 'Tecno',
      'Laptops', 'Phones', 'Mouse', 'Keyboard', 'Monitors'
    ],
    'gas-refill': [
      'Total', 'Shell', 'K-Gas', 'Pro Gas', 'NOCK', 
      'Oilibya', 'Hashi', 'Oryx', 'AfriGas'
    ],
    'gas-accessories': [
      'Ramtons', 'Von', 'Mika', 'Supa Gas', 'Hotpoint',
      'Burners', 'Regulators', 'Pipes', 'Adapters'
    ]
  };
  
  // Get relevant brands based on selected category
  const getBrandsForDisplay = () => {
    if (selectedCategory === 'all') {
      // Group brands by category when all categories selected
      return Object.entries(categoryBrands).map(([category, brands]) => ({
        category: formatCategoryName(category),
        brands: ['all', ...brands]
      }));
    } else {
      // Return category-specific brands
      return [
        {
          category: null,
          brands: ['all', ...(categoryBrands[selectedCategory] || [])]
        }
      ];
    }
  };
  
  // Find min and max price for range slider
  const minPrice = Math.min(...products.map(product => product.salePrice));
  const maxPrice = Math.max(...products.map(product => product.salePrice));
  
  // Apply filters and sorting whenever filter state changes
  useEffect(() => {
    // Filter products based on selected filters
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by brand
    if (selectedBrand !== 'all') {
      result = result.filter(product => {
        // Check if product has this brand or belongs to this product type
        return product.brand === selectedBrand || 
               product.type === selectedBrand.toLowerCase() ||
               product.subCategory === selectedBrand.toLowerCase();
      });
    }
    
    // Filter by price range
    result = result.filter(product => (
      product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1]
    ));
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'bestselling':
        result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
      case 'discount':
        result.sort((a, b) => {
          const discountA = a.regularPrice ? ((a.regularPrice - a.salePrice) / a.regularPrice) : 0;
          const discountB = b.regularPrice ? ((b.regularPrice - b.salePrice) / b.regularPrice) : 0;
          return discountB - discountA;
        });
        break;
      default:
        // Default sorting (featured or recommended)
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, selectedBrand, priceRange, sortBy]);

  // Reset brand when category changes
  useEffect(() => {
    setSelectedBrand('all');
  }, [selectedCategory]);

  // Format category name for display
  const formatCategoryName = (category) => {
    if (category === 'all') return 'All Categories';
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const isMinPrice = e.target.id === 'min-price';
    
    setPriceRange(prev => {
      const [min, max] = prev;
      return isMinPrice ? [value, max] : [min, value];
    });
  };

  // Toggle mobile filter visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="my-8">
      {/* Mobile filter toggle button */}
      <div className="mb-4 md:hidden">
        <button 
          onClick={toggleFilter}
          className="w-full dark:bg-gray-700 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter & Sort ({filteredProducts.length} products)
        </button>
      </div>

      <div className="flex flex-col md:flex-row  gap-6">
        {/* Filter sidebar - always visible on desktop, toggleable on mobile */}
        <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'} md:w-64 dark:bg-gray-700 dark:text-white bg-white p-4 rounded-lg shadow-md`}>
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 dark:text-gray-100 text-gray-700">
                    {formatCategoryName(category)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Brands</h3>
            <div className="max-h-100 overflow-y-auto space-y-4 pr-2">
              {getBrandsForDisplay().map((brandGroup, index) => (
                <div key={index} className="space-y-2">
                  {brandGroup.category && (
                    <div className="font-medium text-gray-600 dark:text-gray-300 border-b pb-1 mb-2">
                      {brandGroup.category}
                    </div>
                  )}
                  {brandGroup.brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="radio"
                        id={`brand-${brand}`}
                        name="brand"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 dark:text-gray-100 text-gray-700">
                        {brand === 'all' ? 'All Brands' : brand}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  id="min-price"
                  min={minPrice}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  className="w-24 px-2 py-1 border dark:text-black rounded"
                />
                <span className="mx-2">-</span>
                <input
                  type="number"
                  id="max-price"
                  min={priceRange[0]}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-24 px-2 py-1 border dark:text-black rounded"
                />
              </div>
              <div className="px-2">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-lg mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border dark:bg-gray-700 border-gray-300 rounded bg-white"
            >
              <option value="default">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="bestselling">Best Selling</option>
              <option value="discount">Offers</option>
            </select>
          </div>

          {/* Filter reset button */}
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedBrand('all');
              setPriceRange([minPrice, maxPrice]);
              setSortBy('default');
            }}
            className="w-full dark:bg-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Reset Filters
          </button>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          {/* Desktop Sort and results info */}
          <div className="hidden md:flex justify-between items-center mb-4">
            <p className="text-gray-600">{filteredProducts.length} products found</p>
            <div className="flex items-center">
              <label htmlFor="desktop-sort" className="mr-2 text-gray-700">Sort:</label>
              <select
                id="desktop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border dark:bg-gray-700 border-gray-300 rounded bg-white"
              >
                <option value="default">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestselling">Best Selling</option>
                <option value="discount">Offers</option>
              </select>
            </div>
          </div>

          {/* No products found message */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try changing your filter criteria or reset filters to see all products.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setPriceRange([minPrice, maxPrice]);
                  setSortBy('default');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* Product grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showCategory={selectedCategory === 'all'} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;