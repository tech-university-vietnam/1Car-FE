import {
  BookOutlined,
  CarOutlined,
  PieChartFilled,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom';
import SecurityLayout from '../../components/Layout/SecurityLayout';
import { UserRole } from '../../redux/reducer/user';
import BookingManagement from './BookingManagement';
import CarManagement from './CarManagement';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
const { Header, Content, Footer, Sider } = Layout;

const MENU_LABEL = [
  'Dashboard',
  'User Management',
  'Car Management',
  'Booking Management',
];

const MENU_PATH = ['/admin', '/admin/user', '/admin/car', '/admin/booking'];

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <Layout className='' style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsedWidth={70} breakpoint='lg'>
        <div className='logo flex items-center justify-center'>
          <a href='/'>
            <img src='/car.png' />
          </a>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[PieChartFilled, UserOutlined, CarOutlined, BookOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: MENU_LABEL[index],
              onClick: () => navigate(MENU_PATH[index]),
            })
          )}
        />
      </Sider>
      <Layout>
        <Header className='flex w-full items-center justify-end bg-white'>
          <Button className='ml-auto'>Logout</Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
          className='bg-slate-200'
        >
          <div
            className='site-layout-background'
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Routes>
              <Route path='/user' element={<UserManagement />} />
              <Route path='/car' element={<CarManagement />} />
              <Route path='/booking' element={<BookingManagement />} />
              <Route path='/' element={<Dashboard />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Team 1 - 1Car
        </Footer>
      </Layout>
    </Layout>
  );
};

export default function DashboardWithSecurity() {
  return (
    <SecurityLayout role={[UserRole.ADMIN]} fallback='/'>
      <AdminPage />
    </SecurityLayout>
  );
}
