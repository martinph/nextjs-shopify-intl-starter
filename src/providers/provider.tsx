"use client";

import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import client from "@/lib/shopify/client";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ApolloProvider client={client}>
            <CurrencyProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </CurrencyProvider>
        </ApolloProvider>
    )
}
