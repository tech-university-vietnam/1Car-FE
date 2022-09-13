import Cookies from 'universal-cookie';

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

export const logoutWithAuth0 = (logout: any) => {
  logout({ returnTo: window.location.origin });
  const cookies = new Cookies();
  cookies.remove('access_token', { path: '/' });
  localStorage.removeItem('userEmail');
  localStorage.removeItem('user');
};
