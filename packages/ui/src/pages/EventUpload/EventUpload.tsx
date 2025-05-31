import { useState } from 'react';
import { Upload, Typography, App } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;
const { Title, Text } = Typography;

function EventUpload() {
  const { message } = App.useApp();
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: '/api/local/events/upload',
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: (file: RcFile) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      return true;
    },
    onChange: (info) => {
      const { status, response } = info.file;
      
      if (status === 'uploading') {
        setUploading(true);
        return;
      }
      
      setUploading(false);
      
      if (status === 'done' && response) {
        message.success(response.message || 'Image uploaded successfully! We will process your event shortly.');
      } else if (status === 'error') {
        const errorMsg = response?.error || 'Failed to upload image.';
        message.error(errorMsg);
      }
    },
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Title level={2}>Create Event from Image</Title>
      <Text style={{ display: 'block', marginBottom: 24 }}>
        Upload an image containing event information, and we'll automatically create the event for you.
      </Text>

      <Dragger {...uploadProps} disabled={uploading}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          {uploading ? 'Uploading...' : 'Click or drag an image to this area to upload'}
        </p>
        <p className="ant-upload-hint">
          Supported formats: JPG, PNG, GIF
        </p>
      </Dragger>
    </div>
  );
}

export default EventUpload;
