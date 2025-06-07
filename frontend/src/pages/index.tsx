import { useState, useEffect } from 'react';
import { Layout, Input, Row, Col, Typography, Card, message } from 'antd';
import { FireOutlined, ClockCircleOutlined } from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import { Tool } from '@/types';
import { toolsApi } from '@/services/api';

const { Search } = Input;
const { Title } = Typography;

const Home = () => {
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([]);
  const [latestTools, setLatestTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 获取写作分类下的工具
        const writingTools = await toolsApi.getByCategorySlug('writing');
        setFeaturedTools(writingTools.filter(t => t.featured));
        setLatestTools(writingTools.sort((a, b) => 
          (new Date(b.created_at ?? 0).getTime()) - 
          (new Date(a.created_at ?? 0).getTime())
        ).slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        message.error('获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mb-8">
          <Title level={1} className="!mb-4">
            发现优质AI工具
          </Title>
          <p className="text-gray-600 mb-8 text-lg">
            探索和发现最新最热门的AI工具，提升你的工作效率
          </p>
          <Search
            placeholder="搜索AI工具..."
            size="large"
            className="max-w-2xl"
            enterButton="搜索"
          />
        </div>

        {/* Featured Tools */}
        <section className="mb-12">
          <Title level={2} className="flex items-center gap-2 !mb-6">
            <FireOutlined className="text-red-500" />
            热门推荐
          </Title>
          <Row gutter={[16, 16]}>
            {featuredTools.map(tool => (
              <Col key={tool.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={<img alt={tool.name} src={tool.logo_url} />}
                >
                  <Card.Meta
                    title={tool.name}
                    description={tool.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Latest Tools */}
        <section>
          <Title level={2} className="flex items-center gap-2 !mb-6">
            <ClockCircleOutlined className="text-blue-500" />
            最新工具
          </Title>
          <Row gutter={[16, 16]}>
            {latestTools.map(tool => (
              <Col key={tool.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={<img alt={tool.name} src={tool.logo_url} />}
                >
                  <Card.Meta
                    title={tool.name}
                    description={tool.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home; 