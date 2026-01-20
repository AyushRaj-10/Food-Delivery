import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { AdminContext } from '../../../Admin-Panel/src/context/AdminContext'; // adjust path
import { useCart } from '../Context/CartContenxt';

const Offer = () => {
  const { foods, GetFood } = useContext(AdminContext);
  const { addToCart, removeFromCart, cart } = useCart();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Map food IDs to quantities from global cart
  const quantities = {};
  if (cart && Array.isArray(cart)) {
    cart.forEach((item) => {
      const id = item.food?._id || item.food?.id;
      if (id) quantities[id] = item.quantity;
    });
  }

  // Fetch foods on mount if not already fetched
  useEffect(() => {
    if (!foods || foods.length === 0) {
      GetFood();
    }
  }, [foods, GetFood]);

  // Filter foods with discount > 0
  const discountedFoods = foods ? foods.filter(food => food.discount && food.discount > 0) : [];

  // Handlers for increment and decrement
  const handleAdd = (food) => {
    addToCart(food);
  };

  const handleRemove = (food) => {
    removeFromCart(food._id);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (!discountedFoods.length) {
    return (
      <section ref={sectionRef} className="py-20 max-w-7xl mx-auto px-4 text-center text-gray-500">
        <p>No current offers available.</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 max-w-7xl mx-auto px-4 bg-gradient-to-br from-gray-50 via-white to-orange-50 rounded-3xl shadow-lg"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold mb-12 text-center text-gray-900"
      >
        Current Offers
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {discountedFoods.map((food) => {
          const discountedPrice = (food.price - (food.price * food.discount) / 100).toFixed(2);
          const quantity = quantities[food._id || food.id] || 0;

          return (
            <motion.div
              key={food._id || food.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Food Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold rounded-full px-3 py-1 shadow-lg">
                  {food.discount}% OFF
                </div>
              </div>

              {/* Food Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{food.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{food.description}</p>

                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 line-through mr-2">₹{food.price.toFixed(2)}</span>
                    <span className="text-lg font-bold text-gray-900">₹{discountedPrice}</span>
                  </div>

                  {/* Add to Cart Controls */}
                  {quantity > 0 ? (
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                      <button
                        onClick={() => handleRemove(food)}
                        aria-label={`Remove one ${food.name} from cart`}
                        className="p-1 rounded-full hover:bg-gray-300"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-semibold">{quantity}</span>
                      <button
                        onClick={() => handleAdd(food)}
                        aria-label={`Add one ${food.name} to cart`}
                        className="p-1 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(food)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                      aria-label={`Add ${food.name} to cart`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Offer;
