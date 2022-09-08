import { User, UserRole } from '../../redux/reducer/user';

export default function SecurityLayout({
  children,
  role = [],
  fallback = '/',
}: {
  children: any;
  role: UserRole[];
  fallback: string;
}) {
  try {
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      const user: User = JSON.parse(userRaw);
      if (role.map((item) => item.toString()).includes(user.userRole)) {
        return children;
      } else {
        throw new Error('Not authorized');
      }
    } else throw new Error('Not authorized');
  } catch (err) {
    window.location.href = fallback;
  }
  return <div></div>;
}
