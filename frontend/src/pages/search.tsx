import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Spin, Empty, Typography, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import ToolCard from '@/components/Card/ToolCard';
import { Tool } from '@/types';
import { toolsApi } from '@/services/api';

const { Title } = Typography;
const { Search } = Input;

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchTools = async () => {
      if (!q) return;
      
      try {
        setLoading(true);
        const results = await toolsApi.search(q as string);
        setTools(results);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    searchTools();
  }, [q]);

  const onSearch = (value: string) => {
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="mb-8">
          <Search
            defaultValue={q as string}
            placeholder="搜索AI工具..."
            size="large"
            onSearch={onSearch}
            loading={loading}
            className="max-w-2xl mx-auto"
            enterButton="搜索"
          />
        </div>

        {q && (
          <Title level={3} className="mb-6">
            <SearchOutlined className="mr-2" />
            搜索 "{q}" 的结果
          </Title>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : tools.length > 0 ? (
          <Row gutter={[16, 16]}>
            {tools.map(tool => (
              <Col key={tool.id} xs={24} sm={12} md={8} lg={6}>
                <ToolCard tool={tool} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty 
            description={
              <span>
                未找到与 "{q}" 相关的工具
                <br />
                <small className="text-gray-500">
                  试试其他关键词，或者
                  <a href="/submit" className="text-blue-500 ml-1">
                    提交新工具
                  </a>
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

export default SearchPage; 