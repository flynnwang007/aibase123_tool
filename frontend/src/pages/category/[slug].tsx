import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin, Empty, message } from 'antd';
import MainLayout from '@/components/Layout/MainLayout';
import ToolCard from '@/components/Card/ToolCard';
import { categories } from '@/data/categories';
import { toolsApi } from '@/services/api';
import { Tool } from '@/types';

const { Title } = Typography;

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  // 查找当前分类
  const category = categories.find(c => c.slug === slug) || 
                  categories.find(c => c.children?.some(child => child.slug === slug));
  
  const subCategory = category?.children?.find(c => c.slug === slug);
  const title = subCategory?.name || category?.name || '';

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await toolsApi.getByCategorySlug(slug as string);
        setTools(data);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        message.error('获取工具列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto">
        <Title level={2} className="mb-8">分类：{slug}</Title>
        {tools.length > 0 ? (
          <Row gutter={[16, 16]}>
            {tools.map(tool => (
              <Col key={tool.id} xs={24} sm={12} md={8} lg={6}>
                <ToolCard tool={tool} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty 
            description="暂无工具" 
            className="py-20"
          />
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage; 