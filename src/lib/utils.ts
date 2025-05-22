export function formatNumber(
    amount: number,
    locale: string,
    options?: Intl.NumberFormatOptions
): string {
    const defaultOptions: Intl.NumberFormatOptions = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    };
    options = { ...defaultOptions, ...options };

    return new Intl.NumberFormat(locale, options).format(amount);
}

export const formatPrice = (
  amount: number,
  currency: string,
  locale: string
): string => {
    const options: Intl.NumberFormatOptions = {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    
    return new Intl.NumberFormat(locale, options).format(amount);
}