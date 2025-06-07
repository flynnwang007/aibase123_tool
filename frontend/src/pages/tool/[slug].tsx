import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Tag, Button, Spin, message, Divider, Typography, Rate } from 'antd';
import { 
  LinkOutlined, 
  EyeOutlined, 
  StarOutlined, 
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined 
} from '@ant-design/icons';
import Image from 'next/image';
import MainLayout from '@/components/Layout/MainLayout';
import CommentSection from '@/components/Comments/CommentSection';
import { Tool } from '@/types';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { toolsApi } from '@/services/api';

const { Title, Paragraph } = Typography;

const ToolDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [tool, setTool] = useState<Tool | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchTool = async () => {
      try {
        setLoading(true);
        const toolData = await toolsApi.getBySlug(slug as string);
        setTool(toolData);
        
        // 获取相关工具
        const relatedData = await toolsApi.getByCategory(toolData.category_id);
        setRelatedTools(relatedData.filter(t => t.id !== toolData.id).slice(0, 4));
        
        // 更新浏览量
        await toolsApi.incrementViews(toolData.id);
      } catch (error) {
        console.error('Failed to fetch tool:', error);
        message.error('获取工具信息失败');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [slug, router]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || '';
  };

  const handleFavorite = () => {
    if (!tool) return;
    
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (isFavorited) {
        const newFavorites = favorites.filter((id: number) => id !== tool.id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        message.success('已取消收藏');
      } else {
        favorites.push(tool.id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        message.success('收藏成功');
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Favorite action failed:', error);
      message.error('操作失败，请稍后重试');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success('链接已复制到剪贴板');
    } catch (error) {
      console.error('Share failed:', error);
      message.error('分享失败，请手动复制链接');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (!tool) return null;

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Card className="mb-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <Image
                src={tool.logo_url}
                alt={tool.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <Title level={2} className="!mb-2">{tool.name}</Title>
                <div className="flex gap-2">
                  <Button 
                    icon={isFavorited ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleFavorite}
                    type={isFavorited ? 'primary' : 'default'}
                  >
                    {isFavorited ? '已收藏' : '收藏'}
                  </Button>
                  <Button 
                    icon={<ShareAltOutlined />}
                    onClick={handleShare}
                  >
                    分享
                  </Button>
                </div>
              </div>
              <Paragraph className="text-gray-600 mb-4">{tool.description}</Paragraph>
              <div className="flex items-center gap-4 mb-4">
                <Button 
                  type="primary" 
                  icon={<LinkOutlined />}
                  href={tool.website_url}
                  target="_blank"
                  size="large"
                >
                  访问网站
                </Button>
                <div className="space-x-2">
                  {tool.tags.map(tag => (
                    <Tag key={tag.id} color="blue">{tag.name}</Tag>
                  ))}
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-sm gap-6">
                <span>
                  <EyeOutlined className="mr-1" />
                  {tool.views} 次浏览
                </span>
                <span>
                  <StarOutlined className="mr-1" />
                  {getCategoryName(tool.category_id)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="评价与评论" className="mb-6">
          <CommentSection tool={tool} />
        </Card>

        {relatedTools.length > 0 && (
          <Card title="相关工具">
            <Row gutter={[16, 16]}>
              {relatedTools.map(tool => (
                <Col key={tool.id} xs={24} sm={12} md={8} lg={6}>
                  <Card 
                    hoverable 
                    onClick={() => router.push(`/tool/${tool.slug}`)}
                    cover={
                      <div className="p-4">
                        <Image
                          src={tool.logo_url}
                          alt={tool.name}
                          width={60}
                          height={60}
                          className="rounded"
                        />
                      </div>
                    }
                  >
                    <Card.Meta
                      title={tool.name}
                      description={tool.description}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default ToolDetail; 