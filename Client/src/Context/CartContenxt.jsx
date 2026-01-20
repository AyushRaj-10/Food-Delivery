import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

const url = import.meta.env.VITE_API_URL;
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AppContext);
  const [cart, setCart] = useState([]);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${url}/cart/${user.id}`);
      if (res.data.success) setCart(res.data.cartItems);
      else setCart([]);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchCart();
  }, [user]);

  // Add item to cart
  const addToCart = async (food, quantity = 1) => {
    try {
      // Check if item is already in cart
      const existingItem = cart.find((item) => {
        const itemFoodId =
          typeof item.food === "string" ? item.food : item.food._id;
        return itemFoodId === food._id;
      });

      console.log(existingItem);

      if (existingItem) {
        await axios.put(`${url}/cart`, {
          user: user.id,
          food: food._id,
          quantity: existingItem.quantity + quantity,
        });
      } else {
        await axios.post(`${url}/cart`, {
          user: user.id,
          food: food._id,
          quantity,
        });
      }
      console.log(food);
      // Refresh local cart state
      await fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      // Find the item in the current cart
      const item = cart.find(
        (c) => (typeof c.food === "string" ? c.food : c.food._id) === foodId
      );
  
      if (!item) return;
  
      if (item.quantity > 1) {
        // Decrease quantity by 1
        await axios.put(`${url}/cart`, {
          user: user.id,
          food: foodId,
          quantity: item.quantity - 1,
        });
      } else {
        // Remove the item completely
        await axios.delete(`${url}/cart`, {
          data: { user: user.id, food: foodId },
        });
      }
  
      // Refresh local cart state
      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };
  

  const getCart = async (userId) => {
    try {
      const res = await axios.get(`${url}/cart/${userId}`);
      console.log(res)

      if (res.data.success) {
        setCart(res.data.cartItems);
      } else {
        setCart([]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCart , fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
