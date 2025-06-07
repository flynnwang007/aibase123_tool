import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Header } = Layout;

const HeaderComponent = () => {
  const router = useRouter();

  const menuItems = [
    { key: 'tools', label: 'AI工具集' },
    { key: 'favorites', label: '我的收藏' },
    { key: 'news', label: 'AI快讯' },
    { key: 'submit', label: '提交工具' },
  ];

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'tools':
        router.push('/');
        break;
      case 'favorites':
        router.push('/favorites');
        break;
      case 'submit':
        router.push('/submit');
        break;
      default:
        break;
    }
  };

  return (
    <Header className="fixed top-0 w-full z-10 bg-white px-0">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          AI工具集
        </Link>
        <Menu 
          mode="horizontal" 
          selectedKeys={[router.pathname === '/' ? 'tools' : router.pathname.slice(1)]}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
          className="border-0"
        />
      </div>
    </Header>
  );
};

export default HeaderComponent; 