"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Button from "./ui/Button";
import { useLocale, useTranslations } from "next-intl";
import { useCurrency } from "@/context/CurrencyContext";
import { formatPrice } from "@/lib/utils";

type ProductBoxProps = {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
}

export default function ProductBox({ id, name, price, imageUrl }: ProductBoxProps) {
    const { addItem } = useCart();
    const { currency } = useCurrency();
    const locale = useLocale();
    const t = useTranslations("Product");
    return (
        <div className="product-box">
            {imageUrl && (
                <Image src={imageUrl} alt={name} width={200} height={200} className="product-image" />
            )}
            <h2 className="product-name">{name}</h2>
            <p className="product-price">{formatPrice(price, currency, locale)}</p>
            <Button onClick={() => addItem({ id, name, quantity: 1, price })} className="cursor-pointer">
                {t("add_to_cart")}
            </Button>
        </div>
    )
}