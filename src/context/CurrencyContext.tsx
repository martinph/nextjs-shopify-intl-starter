"use client";

import React, { useEffect, useState } from "react";

const DEFAULT_CURRENCY = "GBP";

type CurrencyContextType = {
    currency: string;
    updateCurrency: (currency: string) => void;
};

const CurrencyContext = React.createContext<CurrencyContextType>({
    currency: DEFAULT_CURRENCY,
    updateCurrency: () => {},
});

export const useCurrency = () => React.useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [currency, setCurrency] = useState<string>(DEFAULT_CURRENCY);

    useEffect(() => {
        const storedCurrency = localStorage.getItem("currency");
        if (storedCurrency) {
            setCurrency(storedCurrency);
        } else {
            updateCurrency(DEFAULT_CURRENCY);
        }
    }, []);

    const updateCurrency = (currency: string) => {
        setCurrency(currency);
        localStorage.setItem("currency", currency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, updateCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};