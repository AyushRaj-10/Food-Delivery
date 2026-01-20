import React, { useEffect, useState } from "react";
import { Star, ShoppingCart, Trash2, RefreshCw, Sparkles, ChefHat } from "lucide-react";
import { useCart } from '../Context/CartContenxt';

const Cart = () => {
  const { cart, removeFromCart, fetchCart, getCart, addToCart } = useCart();
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    // Calculate total cost with discount
    const total = cart.reduce((acc, item) => {
      const price = item.food?.price || 0;
      const discount = item.food?.discount || 0; // discount in percentage
      const discountedPrice = price - (price * discount) / 100;
      return acc + discountedPrice * item.quantity;
    }, 0);
    setTotalCost(total);
  }, [cart]);

  // Calculate tax (5% of totalCost)
  const tax = totalCost * 0.05;

  // Calculate delivery fee (2% of totalCost, minimum ₹50)
  const deliveryFee = Math.max(totalCost * 0.02, 50);

  // Final amount = totalCost + tax + deliveryFee
  const finalAmount = totalCost + tax + deliveryFee;

  const handler = async () => {
    await getCart(user.id);
    await fetchCart();
  };

  const handleAdd = async (food) => {
    await addToCart(food);
    await fetchCart();
  };

  const handlePayment = () => {
    alert(`Proceeding to payment of ₹${finalAmount.toFixed(2)}`);
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,48,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(34,197,94,0.2),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <ChefHat className="h-6 w-6 text-orange-400" />
              <span className="text-white/80 font-medium">Foodio Kitchen</span>
            </div>

            <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="block text-white drop-shadow-2xl">Your</span>
              <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Cart
              </span>
            </h1>

            <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Curated flavors, crafted experiences. Ready to satisfy your cravings.
            </p>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-center mb-16">
            <button
              onClick={handler}
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              aria-label="Refresh Cart"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Refresh Cart</span>
                <Sparkles className="h-4 w-4 group-hover:animate-spin" />
              </div>
            </button>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8">
                <ShoppingCart className="h-16 w-16 text-white/60" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Your cart is empty</h3>
              <p className="text-xl text-white/60 max-w-md mx-auto">
                Discover amazing dishes and start building your perfect meal
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item, index) => {
                const price = item.food?.price || 0;
                const discount = item.food?.discount || 0;
                const discountedPrice = price - (price * discount) / 100;

                return (
                  <div
                    key={item._id}
                    className="group relative bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                    <div className="absolute inset-[2px] bg-white rounded-3xl"></div>

                    <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8">
                      {/* Premium Image Container */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <img
                          src={item.food?.image}
                          alt={item.food?.name}
                          className="relative w-40 h-32 object-cover rounded-2xl shadow-xl border-4 border-white"
                        />

                        {/* Floating Badge */}
                        {discount > 0 && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                            {discount}% OFF
                          </div>
                        )}
                      </div>

                      {/* Enhanced Info Section */}
                      <div className="flex-1 w-full lg:w-auto">
                        <div className="flex items-start justify-between mb-4">
                          <h2 className="text-3xl font-black text-gray-900 leading-tight">
                            {item.food?.name}
                          </h2>
                          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full shadow-lg">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="font-bold text-lg">{item.food?.rating?.toFixed(1)}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-lg mb-6 leading-relaxed max-w-2xl">
                          {item.food?.description || "Delicious food item crafted with premium ingredients"}
                        </p>

                        {/* Enhanced Tags */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold rounded-full shadow-lg">
                            {item.food?.cuisine || item.food?.category}
                          </span>
                          {(item.food?.tags || []).slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-200 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Premium Controls */}
                      <div className="flex flex-col items-center gap-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeFromCart(item.food._id)}
                            aria-label={`Remove one ${item.food.name} from cart`}
                            className="group/btn relative w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-110 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <MinusIcon className="relative h-6 w-6 mx-auto" />
                          </button>

                          <div className="w-20 h-16 bg-white rounded-xl shadow-lg border-2 border-gray-200 flex items-center justify-center">
                            <span className="text-2xl font-black text-gray-900">
                              {item.quantity}
                            </span>
                          </div>

                          <button
                            onClick={() => handleAdd(item.food)}
                            aria-label={`Add one ${item.food.name} to cart`}
                            className="group/btn relative w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-110 overflow-hidden"
                            title="Add more functionality here"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <PlusIcon className="relative h-6 w-6 mx-auto" />
                          </button>
                        </div>

                        {/* Price Display */}
                        <div className="text-center">
                          <div className="text-3xl font-black text-gray-900 mb-1">
                            ₹{(discountedPrice * item.quantity).toFixed(2)}
                          </div>
                          {discount > 0 && (
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-sm text-gray-400 line-through">
                                ₹{(price * item.quantity).toFixed(2)}
                              </span>
                              <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                                Save ₹{((price - discountedPrice) * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.food._id)}
                          aria-label={`Remove ${item.food.name} from cart`}
                          className="group/remove relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover/remove:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative flex items-center gap-2">
                            <Trash2 className="h-5 w-5 group-hover/remove:animate-bounce" />
                            <span>Remove</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Premium Total & Payment Section */}
              <div className="relative mt-16">
                {/* Glowing Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>

                <div className="relative bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 overflow-hidden">
                  {/* Animated Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-10 animate-pulse rounded-3xl"></div>

                  <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Total Section */}
                    <div className="text-center lg:text-left space-y-2">
                      <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <Sparkles className="h-8 w-8 text-orange-500 animate-spin" />
                        <span className="text-xl text-gray-600 font-medium">Total Amount</span>
                      </div>
                      <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent">
                        ₹{totalCost.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        Including all discounts • {cart.length} items
                      </div>

                      {/* Tax and Delivery Fee */}
                      <div className="mt-4 text-left max-w-xs mx-auto lg:mx-0 space-y-1 text-gray-700 font-semibold">
                        <div className="flex justify-between">
                          <span>Tax (5%)</span>
                          <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee (min ₹50)</span>
                          <span>₹{deliveryFee.toFixed(2)}</span>
                        </div>
                        <hr className="border-gray-300 my-2" />
                        <div className="flex justify-between text-xl font-extrabold text-gray-900">
                          <span>Final Amount</span>
                          <span>₹{finalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Button */}
                    <button
                      onClick={handlePayment}
                      className="group relative px-12 py-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 transform hover:scale-105 overflow-hidden"
                      aria-label="Proceed to payment"
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      <div className="relative flex items-center gap-4">
                        <ShoppingCart className="h-6 w-6 group-hover:animate-bounce" />
                        <span>Proceed to Payment</span>
                        <div className="w-2 h-2 bg-white rounded-full group-hover:animate-ping"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-20">
        <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping delay-200"></div>
      </div>
    </section>
  );
};

// Enhanced Icons with perfect contrast
const PlusIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default Cart;
