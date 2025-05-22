"use client";

import { useCart } from "@/context/CartContext"
import CartDrawer from "./CartDrawer";
import { use, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { formatNumber } from "@/lib/utils";

export default function Header() {
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const { totalQuantity, status } = useCart();
    const locale = useLocale();
    const t = useTranslations("Header");

    const previousQuantity = useRef<number>(totalQuantity);

    useEffect(() => {
        if (status !== null) {
            setCartOpen(true);
        }
    }, [totalQuantity]);

    return (
        <header className="fixed flex items-center w-full justify-between p-4 bg-gray-700 text-white">
            <h1 className="text-2xl font-bold">My E-commerce Store</h1>
            <nav className="flex space-x-4">
                <a href="/" className="hover:text-gray-400">Home</a>
                <a href="/products" className="hover:text-gray-400">Products</a>
                <button onClick={() => setCartOpen(!cartOpen)} className="cursor-pointer hover:text-gray-400">{t("cart", {count: formatNumber(totalQuantity, locale)})}</button>
            </nav>
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)}/>
        </header>
    )
}