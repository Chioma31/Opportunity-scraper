export const formatCurrency = (amount: number, currency: string): string => {
    const formatter = new Intl.NumberFormat('NG', {
        style: 'currency',
        currency: currency === 'NGN' ? 'NGN' : 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
}; 