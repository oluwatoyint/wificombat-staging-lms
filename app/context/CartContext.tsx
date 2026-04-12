"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

type CartItem = {
  id: string;
  course_id?: string;
  subject?: string;
  title?: string;
  name?: string;
  type: 'course' | 'module';
  price: string;
  quantity: number;
  details: any; // additional details of the course/module
  level?: string;
};

type CartContextType = {
  cart: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  cartQuantity: number;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
  isNotificationDisplayed: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
};

type CartProviderProps = {
  children: ReactNode; 
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isNotificationDisplayed, setIsNotificationDisplayed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on initialization, only on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setIsLoading(false); // Set loading to false after initial load
    }
  }, []);

  // Update cart quantity and persist cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      setCartQuantity(cart.reduce((acc, item) => acc + item.quantity, 0));
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // If the item is a course, ensure its modules aren't added separately
      if (item.type === 'course' && item.details?.modules?.length > 0) {
        
        // Check if any module of this course is already in the cart
        const courseModulesInCart = prevCart.filter(
          (cartItem) => cartItem.type === 'module' && cartItem.details?.course_id === item.id
        );
        
        if (courseModulesInCart.length > 0) {
          // Notify the user that they cannot add the course if modules are already in the cart
          toast.error('Please remove individual modules before adding the full course.');
          return prevCart; // Do not add the course
        }

        // Remove any existing modules of this course before adding the course
        const updatedCart = prevCart.filter(
          (cartItem) => cartItem.type !== 'module' || cartItem.details?.course_id !== item.id
        );
        return [...updatedCart, { ...item, quantity: 1 }];
      }

      // If the item is a module, ensure the course is not already in the cart
      if (item.type === 'module') {
        const courseInCart = prevCart.find(
          (cartItem) => cartItem.type === 'course' && cartItem.id === item.details.course_id
        );

        if (courseInCart && item.type === 'module') {
          // Notify the user that they cannot add a module if the course is already in the cart
          // toast.error('The course has already been added to the cart. You cannot add individual modules.');
          return prevCart; // Do not add the module
        }

         // Get the number of modules of this course already in the cart
        const modulesInCart = prevCart.filter(
          (cartItem) => cartItem.type === 'module' && cartItem.details?.course_id === item.details.course_id
        );

        // Check if adding this module would mean all modules are in the cart
        const totalModules = item.details.totalModules;
        if (modulesInCart.length + 1 === totalModules) {
          toast.error('You are trying to add all modules. Please add the full course instead.');
          return prevCart;
        }
      }

      // Add item (course or module) to the cart
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

      if (itemIndex === -1) {
        // Add new item to cart
        return [...prevCart, { ...item, quantity: 1 }];
      } else {
        // Increment quantity of existing item
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      }
    });
  };

  const removeItemFromCart = (id: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]); // Clear the cart state
    localStorage.removeItem('cart'); // Remove cart from localStorage
  };

  const isInCart = (id: string) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addItemToCart, 
      removeItemFromCart, 
      clearCart,
      cartQuantity, 
      isInCart, 
      isNotificationDisplayed,
      isModalOpen, 
      setIsModalOpen }}>
      {children}
    </CartContext.Provider>
  );
};