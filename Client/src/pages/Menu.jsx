import React, { useEffect, useContext, useState } from "react";
import { AdminContext } from "../../../Admin-Panel/src/context/AdminContext";
import { useCart } from "../Context/CartContenxt"; // Import your cart hook
import { Plus, Minus } from "lucide-react";

const Menu = () => {
  const { foods, GetFood } = useContext(AdminContext);
  const { addToCart, removeFromCart, cart } = useCart(); 
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    GetFood();
  }, []);

  // Update categories when foods change
  useEffect(() => {
    if (foods && foods.length > 0) {
      const uniqueCategories = [...new Set(foods.map((food) => food.category))];
      setCategories(uniqueCategories);
      setActiveCategory(uniqueCategories[0] || null);
    }
  }, [foods]);

  // Map food IDs to quantities from cart
  const quantities = {};
  if (cart && Array.isArray(cart)) {
    cart.forEach((item) => {
      const id = item.food?._id || item.food?.id;
      if (id) quantities[id] = item.quantity;
    });
  }

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  // Scroll to category section
  const scrollToCategory = (category) => {
    setActiveCategory(category);
    const el = document.getElementById(`category-${category}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handlers for increment and decrement
  const handleAdd = (food) => {
    addToCart(food);
  };

  const handleRemove = (food) => {
    removeFromCart(food._id);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-10 text-gray-900 border-b border-orange-300 pb-4">
        Menu Items
      </h2>

      {/* Category Navigation */}
      <nav className="mb-8 flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => scrollToCategory(category)}
            className={`px-5 py-2 rounded-full font-semibold transition 
              ${
                activeCategory === category
                  ? "bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-red-400 hover:via-orange-400 hover:to-yellow-400 hover:text-white"
              }`}
            aria-current={activeCategory === category ? "true" : undefined}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Foods grouped by category */}
      {categories.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No food items available</p>
      )}

      {categories.map((category) => {
        const foodsInCategory = foods.filter((food) => food.category === category);

        return (
          <section key={category} id={`category-${category}`} className="mb-16 scroll-mt-24">
            <h3 className="text-3xl font-bold mb-8 text-red-700 border-b border-orange-300 pb-2">
              {category}
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {foodsInCategory.map((food) => {
                const discountedPrice = getDiscountedPrice(food.price, food.discount);
                const hasDiscount = food.discount > 0;
                const qty = quantities[food._id] || 0;

                return (
                  <li
                    key={food._id}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
                  >
                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-grow">
                      <h4 className="text-2xl font-extrabold text-gradient bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 mb-2">
                        {food.name}
                      </h4>
                      <p className="text-orange-600 font-semibold mb-1">{food.category}</p>

                      <div className="mb-4">
                        {hasDiscount ? (
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 line-through text-lg">
                              ₹{food.price.toFixed(2)}
                            </span>
                            <span className="text-red-600 font-bold text-xl">
                              ₹{discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded">
                              {food.discount}% OFF
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-900 font-semibold text-xl">
                            ₹{food.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                        {food.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      {qty > 0 ? (
                        <div className="flex items-center justify-center gap-4 w-full bg-gray-100 rounded-xl py-2 px-4">
                          <button
                            onClick={() => handleRemove(food)}
                            aria-label={`Remove one ${food.name} from cart`}
                            className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="font-bold text-lg select-none">{qty}</span>
                          <button
                            onClick={() => handleAdd(food)}
                            aria-label={`Add one ${food.name} to cart`}
                            className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAdd(food)}
                          className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 hover:from-red-700 hover:via-orange-700 hover:to-yellow-600 text-white font-bold py-3 rounded-xl shadow-lg transition"
                          aria-label={`Add to cart ${food.name}`}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </section>
  );
};

export default Menu;
