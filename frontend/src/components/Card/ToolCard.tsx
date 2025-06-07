import { Card, Tag } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tool/${tool.slug}`);
  };

  return (
    <Card hoverable onClick={handleClick} className="h-full">
      <div className="flex items-start space-x-4">
        <Image
          src={tool.logo_url}
          alt={tool.name}
          width={60}
          height={60}
          className="rounded"
        />
        <div>
          <h3 className="text-lg font-medium">{tool.name}</h3>
          <p className="text-gray-500 line-clamp-2 text-sm">{tool.description}</p>
          <div className="mt-2 space-x-2">
            {tool.tags?.map(tag => (
              <Tag key={tag.id} color="blue">{tag.name}</Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ToolCard; 