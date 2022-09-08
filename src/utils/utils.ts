export function calculateDatesBetween(startDate: string, endDate: string) {
  const date1 = new Date(startDate).getTime();
  const date2 = new Date(endDate).getTime();
  return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
}

export function formatCurrency(amount: number) {
  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return nf.format(amount);
}
