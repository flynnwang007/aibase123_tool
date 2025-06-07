import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout style={{ marginTop: 64 }}>
        <Sidebar />
        <Layout>
          <Content className="p-6 bg-gray-100">
            <div className="container mx-auto">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 