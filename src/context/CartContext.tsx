"use client";
import { Cart, CartItem } from "@/types/cart";
import React, { createContext, useContext, useEffect } from "react";

type CartProviderStatus = "item_added" | "item_removed" | "item_updated" | "cart_cleared" | null;

type CartContextType = Cart & {
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    updateItem: (id: string, quantity: number) => void;
    status: CartProviderStatus;
};

const CartContext = createContext<CartContextType>({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
    updateItem: () => {},
    status: null,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{
    children: React.ReactNode;
    statusTimeout?: number;
}> = ({ children, statusTimeout = 500 }) => {
    const [items, setItems] = React.useState<CartItem[]>([]);
    const [totalQuantity, setTotalQuantity] = React.useState<number>(0);
    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const [status, setStatus] = React.useState<CartProviderStatus>(null);

    const updateStatus = (newStatus: "item_added" | "item_removed" | "item_updated" | "cart_cleared") => {
        setStatus(newStatus);
        setTimeout(() => {
            setStatus(null);
        }, statusTimeout);
    };

    const addItem = (item: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            } else {
                return [...prevItems, item];
            }
        });
        setTotalQuantity((prev) => prev + item.quantity);
        setTotalPrice((prev) => prev + item.price * item.quantity);
        updateStatus("item_added");
    };

    const removeItem = (id: string) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === id);
            if (existingItem) {
                const updatedItems = prevItems.filter((i) => i.id !== id);
                setTotalQuantity((prev) => prev - existingItem.quantity);
                setTotalPrice((prev) => prev - existingItem.price * existingItem.quantity);
                return updatedItems;
            }
            return prevItems;
        });
        updateStatus("item_removed");
    };

    const clearCart = () => {
        setItems([]);
        setTotalQuantity(0);
        setTotalPrice(0);
        updateStatus("cart_cleared");
    };

    const updateItem = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id);
            return;
        }
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === id);
            if (existingItem) {
                const updatedItems = prevItems.map((i) =>
                    i.id === id ? { ...i, quantity } : i
                );
                return updatedItems;
            }
            return prevItems;
        });
        updateStatus("item_updated");
    };

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            const parsedCart: Cart = JSON.parse(storedCart);
            setItems(parsedCart.items);
            setTotalQuantity(parsedCart.totalQuantity);
            setTotalPrice(parsedCart.totalPrice);
        }
    }, []);

    useEffect(() => {
        const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalQuantity(totalQuantity);
        setTotalPrice(totalPrice);
    }, [items])

    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify({ items, totalQuantity, totalPrice })
        );
    }, [items]);

    return (
        <CartContext.Provider value={{ items, totalQuantity, totalPrice, addItem, removeItem, clearCart, updateItem, status }}>
            {children}
        </CartContext.Provider>
    )
}