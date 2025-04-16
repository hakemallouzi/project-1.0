import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useCart } from '../context/CartContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/grid';
import { Navigation, Autoplay } from 'swiper/modules';

const Shop = () => {
    const { data: products, isLoading, error } = useQuery('products', () =>
        fetch('https://fakestoreapi.com/products').then(res => res.json())
    );
    const { addToCart } = useCart();

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = useMemo(() => {
        if (!products) return [];
        const unique = [...new Set(products.map(p => p.category))];
        return ['all', ...unique];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

            let priceMatch = true;
            if (priceRange === 'low') priceMatch = product.price <= 50;
            else if (priceRange === 'medium') priceMatch = product.price > 50 && product.price <= 200;
            else if (priceRange === 'high') priceMatch = product.price > 200;

            const searchMatch =
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());

            return categoryMatch && priceMatch && searchMatch;
        });
    }, [products, selectedCategory, priceRange, searchQuery]);

    if (isLoading) return <div className="text-center py-8">Loading products...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error loading products</div>;

    return (
        <div className="container mx-auto px-4 py-8 relative mt-0 pt-0">
            <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Our Products</h1>

            {/* Filters */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="w-full sm:w-48">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full sm:w-48">
                    <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="all">All Prices</option>
                        <option value="low">Under $50</option>
                        <option value="medium">$50 - $200</option>
                        <option value="high">Over $200</option>
                    </select>
                </div>
            </div>

            {/* Products Swiper */}
            {filteredProducts.length > 0 ? (
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop
                        spaceBetween={20}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                    >
                        {filteredProducts.map(product => (
                            <SwiperSlide key={product.id}>
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full min-h-[500px]">
                                    <div className="h-48 flex justify-center items-center bg-white dark:bg-gray-900">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-full object-contain p-4"
                                        />
                                    </div>
                                    <div className="p-4 flex-grow flex flex-col">
                                        <h2 className="text-lg font-semibold mb-2 dark:text-white line-clamp-2">{product.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2 flex-grow">
                                            {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                                        </p>

                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">${product.price}</span>
                                            <div className="flex items-center">
                                                <span className="text-yellow-400">★</span>
                                                <span className="ml-1 text-gray-600 dark:text-gray-300">{product.rating.rate}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium text-lg"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="custom-prev absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 opacity-50">
                        ◀
                    </button>
                    <button className="custom-next absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 opacity-50">
                        ▶
                    </button>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                    No products match your filters. Try adjusting your search criteria.
                </div>
            )}
        </div>
    );
};

export default Shop;
