import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { app } from "../config/firebaseConfig";

export type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  thumbnail: string;
  price: number | null;
  category: string;
};

export type CartItem = {
  book: Book;
  qty: number;
};

type CartContextType = {
  items: Record<string, CartItem>;
  addToCart: (book: Book, qty?: number) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  totalCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Record<string, CartItem>>({});
  const db = getDatabase(app);
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const cartRef = ref(db, `carts/${user.uid}`);
    const unsubscribe = onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setItems(data);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const cartRef = ref(db, `carts/${user.uid}`);
    set(cartRef, items);
  }, [items]);

  const addToCart = (book: Book, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev[book.id];
      const nextQty = (existing?.qty ?? 0) + qty;
      return {
        ...prev,
        [book.id]: { book, qty: Math.max(1, nextQty) },
      };
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems((prev) => {
      const copy = { ...prev };
      delete copy[bookId];
      return copy;
    });
  };

  const clearCart = () => setItems({});

  const totalCount = useMemo(() => Object.keys(items).length, [items]);

  const value = { items, addToCart, removeFromCart, clearCart, totalCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};