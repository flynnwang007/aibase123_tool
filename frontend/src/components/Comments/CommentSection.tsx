import { useState } from 'react';
import { List, Form, Input, Button, Rate, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Tool } from '@/types';

const { TextArea } = Input;

interface CommentData {
  id: number;
  username: string;
  content: string;
  rating: number;
  created_at: string;
}

interface CommentListProps {
  comments: CommentData[];
}

interface CommentSectionProps {
  tool: Tool;
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <List
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={(comment: CommentData) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={
            <div className="flex items-center space-x-2">
              <span>{comment.username}</span>
              <Rate disabled defaultValue={comment.rating} />
            </div>
          }
          description={
            <>
              <div>{comment.content}</div>
              <div className="text-gray-400 text-sm">
                {new Date(comment.created_at).toLocaleDateString()}
              </div>
            </>
          }
        />
      </List.Item>
    )}
  />
);

const CommentSection: React.FC<CommentSectionProps> = ({ tool }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { content: string; rating: number }) => {
    try {
      setSubmitting(true);
      // TODO: 实现评论提交API
      const newComment: CommentData = {
        id: Date.now(),
        username: '访客用户',
        content: values.content,
        rating: values.rating,
        created_at: new Date().toISOString()
      };
      setComments([newComment, ...comments]);
      form.resetFields();
      message.success('评论提交成功！');
    } catch (error) {
      console.error('Submit comment failed:', error);
      message.error('评论提交失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        className="mb-8"
      >
        <Form.Item
          name="rating"
          rules={[{ required: true, message: '请选择评分' }]}
        >
          <Rate allowHalf />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: '请输入评论内容' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="分享你的使用体验..."
          />
        </Form.Item>
        <Form.Item>
          <Button 
            htmlType="submit" 
            type="primary"
            loading={submitting}
          >
            提交评论
          </Button>
        </Form.Item>
      </Form>

      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
