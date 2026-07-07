import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  material: string;
  finish: string;
  imageUrl: string;
  category: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, material: string, finish: string) => void;
  updateQuantity: (id: string, material: string, finish: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = '@app:cart_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          setCartItems(JSON.parse(stored));
        }
      } catch (err) {
        // ignore
      }
    };
    loadCart();
  }, []);

  const saveCart = async (items: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      // ignore
    }
  };

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === item.id && i.material === item.material && i.finish === item.finish
      );
      let updated: CartItem[];
      if (existingIdx > -1) {
        updated = [...prev];
        updated[existingIdx].quantity += 1;
      } else {
        updated = [...prev, { ...item, quantity: 1 }];
      }
      saveCart(updated);
      return updated;
    });
    setIsCartOpen(true); // Open cart automatically when adding item
  }, []);

  const removeFromCart = useCallback((id: string, material: string, finish: string) => {
    setCartItems((prev) => {
      const updated = prev.filter(
        (i) => !(i.id === id && i.material === material && i.finish === finish)
      );
      saveCart(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id: string, material: string, finish: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, material, finish);
      return;
    }
    setCartItems((prev) => {
      const updated = prev.map((i) =>
        i.id === id && i.material === material && i.finish === finish ? { ...i, quantity } : i
      );
      saveCart(updated);
      return updated;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    saveCart([]);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        totalItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
