import { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Card, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import MainLayout from '@/components/Layout/MainLayout';
import { categories } from '@/data/categories';

const { Title } = Typography;
const { TextArea } = Input;

interface SubmitFormValues {
  name: string;
  description: string;
  website_url: string;
  category_id: number;
  logo: UploadFile[];
  tags: string[];
}

const SubmitPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SubmitFormValues) => {
    try {
      setLoading(true);
      console.log('Submit values:', values);
      // TODO: 实现提交API
      message.success('提交成功！我们会尽快审核。');
      form.resetFields();
    } catch (error) {
      console.error('Submit failed:', error);
      message.error('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 构建分类选项
  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.id,
    children: category.children?.map(child => ({
      label: child.name,
      value: child.id
    }))
  }));

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <Title level={2} className="text-center mb-8">
            提交AI工具
          </Title>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="name"
              label="工具名称"
              rules={[{ required: true, message: '请输入工具名称' }]}
            >
              <Input placeholder="请输入工具名称" />
            </Form.Item>

            <Form.Item
              name="description"
              label="工具描述"
              rules={[{ required: true, message: '请输入工具描述' }]}
            >
              <TextArea 
                placeholder="请简要描述该工具的主要功能和特点" 
                rows={4}
              />
            </Form.Item>

            <Form.Item
              name="website_url"
              label="网站地址"
              rules={[
                { required: true, message: '请输入网站地址' },
                { type: 'url', message: '请输入有效的URL' }
              ]}
            >
              <Input placeholder="https://" />
            </Form.Item>

            <Form.Item
              name="category_id"
              label="所属分类"
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Select
                placeholder="请选择分类"
                options={categoryOptions}
              />
            </Form.Item>

            <Form.Item
              name="logo"
              label="Logo"
              rules={[{ required: true, message: '请上传Logo' }]}
            >
              <Upload
                maxCount={1}
                listType="picture-card"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>上传Logo</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="tags"
              label="标签"
              rules={[{ required: true, message: '请添加至少一个标签' }]}
            >
              <Select
                mode="tags"
                placeholder="输入标签并回车"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                size="large"
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SubmitPage; 