import { useState } from 'react';
import { Upload, Typography, App } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { DuplicateEventWarning } from '@/components/DuplicateEventWarning';
import type { DuplicateInfo } from '@/utils/localeventApi';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;
const { Title, Text } = Typography;

function EventUpload() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [duplicates, setDuplicates] = useState<DuplicateInfo[] | null>(null);
  const [pendingEvent, setPendingEvent] = useState<any>(null);

  const handleDuplicateConfirm = async () => {
    try {
      const response = await fetch('/api/local/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingEvent)
      });

      if (!response.ok) throw new Error('Failed to create event');

      const result = await response.json();
      message.success('Event created successfully!');
      setDuplicates(null);
      setPendingEvent(null);
      navigate(`/events/${result.event.id}`);
    } catch (error) {
      message.error('Failed to create event');
      console.error('Error creating event:', error);
    }
  };

  const handleDuplicateCancel = () => {
    setDuplicates(null);
    setPendingEvent(null);
  };

  const handleViewDuplicate = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

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
    onChange: async (info) => {
      const { status, response } = info.file;
      
      if (status === 'uploading') {
        setUploading(true);
        return;
      }
      
      setUploading(false);
      
      if (status === 'done' && response) {
        // If there are potential duplicates, show the warning
        if (response.potentialDuplicates?.length > 0) {
          setDuplicates(response.potentialDuplicates);
          setPendingEvent(response.event);
        } else {
          // No duplicates, show success message
          message.success(response.message || 'Event created successfully!');
          if (response.event?.id) {
            navigate(`/events/${response.event.id}`);
          }
        }
      } else if (status === 'error') {
        const errorMsg = response?.error || 'Failed to upload image.';
        message.error(errorMsg);
      }
    }
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
