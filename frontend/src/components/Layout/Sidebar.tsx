import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { categories } from '@/data/categories';

const { Sider } = Layout;

const Sidebar = () => {
  const router = useRouter();

  // 将分类数据转换为Menu items格式
  const menuItems: MenuProps['items'] = categories.map(category => ({
    key: category.slug,
    icon: category.icon ? <span>{category.icon}</span> : null,
    label: category.name,
    children: category.children?.map(child => ({
      key: child.slug,
      label: child.name,
      icon: child.icon ? <span>{child.icon}</span> : null
    }))
  }));

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    router.push(`/category/${key}`);
  };

  return (
    <Sider 
      width={250} 
      className="bg-white"
      style={{
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: 64,
        left: 0,
        overflowY: 'auto'
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[router.query.category as string]}
        defaultOpenKeys={categories.map(c => c.slug)}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ height: '100%', borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar; 