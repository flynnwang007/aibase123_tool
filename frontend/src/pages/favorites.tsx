import { useEffect, useState } from 'react';
import { Row, Col, Empty, Typography, message } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import ToolCard from '@/components/Card/ToolCard';
import { Tool } from '@/types';
import { favoriteApi } from '@/services/api';

const { Title } = Typography;

const FavoritesPage = () => {
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await favoriteApi.getAll();
        setFavoriteTools(data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        message.error('获取收藏列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Title level={2} className="flex items-center gap-2 mb-6">
          <HeartOutlined className="text-red-500" />
          我的收藏
        </Title>

        {favoriteTools.length > 0 ? (
          <Row gutter={[16, 16]}>
            {favoriteTools.map(tool => (
              <Col key={tool.id} xs={24} sm={12} md={8} lg={6}>
                <ToolCard tool={tool} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description={
              <span>
                还没有收藏任何工具
                <br />
                <small className="text-gray-500">
                  浏览并收藏你感兴趣的AI工具
                </small>
              </span>
            }
            className="py-20"
          />
        )}
      </div>
    </MainLayout>
  );
};

export default FavoritesPage; 