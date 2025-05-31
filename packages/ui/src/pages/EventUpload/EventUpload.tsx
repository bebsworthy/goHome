import { useState } from 'react';
import { Upload, Typography, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;
const { Title, Text } = Typography;

function EventUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: '/api/local/events/upload',
    accept: 'image/*',
    showUploadList: true,
    beforeUpload: (file: RcFile) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      return true;
    },
    onChange: (info) => {
      if (info.file.status === 'uploading') {
        setUploading(true);
        return;
      }
      
      if (info.file.status === 'done') {
        setUploading(false);
        message.success('Image uploaded successfully! We will process your event shortly.');
      } else if (info.file.status === 'error') {
        setUploading(false);
        message.error('Failed to upload image.');
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
        <p className="ant-upload-text">Click or drag an image to this area to upload</p>
        <p className="ant-upload-hint">
          Supported formats: JPG, PNG, GIF
        </p>
      </Dragger>
    </div>
  );
}

export default EventUpload;
