"use client";

import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { formatPrice } from "@/lib/utils";
import clsx from "clsx";
import { XIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

type CartDrawerProps = {
    position?: "left" | "right";
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
};



export default function CartDrawer({position = "right", className, isOpen, onClose}: CartDrawerProps) {
    const [loading, setLoading] = useState(false);
    const { clearCart, totalPrice, totalQuantity, items } = useCart();
    const { currency } = useCurrency();
    const locale = useLocale();
    const t = useTranslations("Cart");

    const handleCheckout = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            clearCart();
        }, 3000);
    };

    return (
        <div className={clsx("fixed top-16 z-50 transition-transform duration-300", {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
            "left-0": position === "left",
            "right-0": position === "right",
        }, className)}>
            <XIcon className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
            <div className="bg-gray-700 text-white shadow-lg p-6 w-full max-w-md h-screen">
                {loading && (
                    <div className="flex items-center justify-center h-full absolute top-0 left-0 bg-gray-800/50 w-full">
                        <div className="loader">Loading</div>
                    </div>
                )}
                <h2 className="text-xl font-bold mb-4">{t("cart")}</h2>
                <CartItems/>
                <div className="flex justify-between mt-4">
                    <p className="text-lg font-semibold">{t("estimated_total", { total: formatPrice(totalPrice, currency, locale)})}</p>
                </div>
                <div className="flex justify-between mt-4 gap-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600" onClick={() => clearCart()}>{t("clear_cart")}</button>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 disabled:opacity-10 disabled:cursor-not-allowed"
                        disabled={totalQuantity <= 0}
                        onClick={handleCheckout}
                    >
                        {t("checkout")}
                    </button>
                </div>
            </div>
        </div>
    );
}

const CartItems = () => {
    const { items, removeItem, updateItem } = useCart();
    const { currency } = useCurrency();
    const locale = useLocale();
    return (
        <div>
            {items.map((item) => (
                <div key={item.id} className="py-2 border-b">
                    <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="flex items-center space-x-2 justify-between">
                            <p>{formatPrice(item.price, currency, locale)}</p>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) => updateItem(item.id, parseInt(e.target.value))}
                                    className="w-16 border rounded p-1"
                                />
                                <button onClick={() => removeItem(item.id)} className="cursor-pointer text-white hover:text-red-500">
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};