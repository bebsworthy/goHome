import { Modal, Form, Input, TimePicker, Button, Space, Card, Typography, DatePicker, Upload, message, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { Event } from '@/utils/localeventApi';
import type { UploadFile, UploadProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Text } = Typography;

interface EditEventFormProps {
  event?: Event;
  open: boolean;
  onCancel: () => void;
  onSave: (updatedEvent: Event) => void;
  mode?: 'create' | 'edit';
  duplicates?: Array<{ event: Event; similarityScore: number }>;
}

export function EditEventForm({ 
  event, 
  open, 
  onCancel, 
  onSave, 
  mode = 'edit',
  duplicates = []
}: EditEventFormProps) {
  const [form] = useForm();
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs[]>(
    event?.dates ? event.dates.map(date => dayjs(date)) : []
  );
  const [showDuplicates, setShowDuplicates] = useState(duplicates.length > 0);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleDateSelect = (date: dayjs.Dayjs | null) => {
    if (date) {
      const newDate = date.startOf('day');
      if (!selectedDates.some(d => d.isSame(newDate, 'day'))) {
        const newDates = [...selectedDates, newDate].sort((a, b) => a.valueOf() - b.valueOf());
        setSelectedDates(newDates);
        form.setFieldValue('dates', newDates);
      }
    }
  };

  const handleDateRemove = (dateToRemove: dayjs.Dayjs) => {
    const newDates = selectedDates.filter(date => !date.isSame(dateToRemove, 'day'));
    setSelectedDates(newDates);
    form.setFieldValue('dates', newDates);
  };

  const handleSubmit = async (values: any) => {
    const eventData = {
      ...(event || {}),
      ...values,
      dates: values.dates.map((date: dayjs.Dayjs) => date.format('YYYY-MM-DD')),
      startTime: values.startTime?.format('HH:mm'),
      endTime: values.endTime?.format('HH:mm'),
    };

    // Save the event first to get its ID
    await onSave(eventData);

    // If we have any files and this is an edit (we have an event ID), upload them
    if (fileList.length > 0 && event?.id) {
      setUploading(true);
      const uploadPromises = fileList.map(async (file) => {
        if (file.originFileObj) {
          const formData = new FormData();
          formData.append('file', file.originFileObj);
          
          try {
            const response = await fetch(`/api/local/events/${event.id}/image`, {
              method: 'POST',
              body: formData,
            });
            
            if (!response.ok) {
              throw new Error('Failed to upload image');
            }
            
            return response.json();
          } catch (error) {
            console.error('Error uploading file:', error);
            message.error(`Failed to upload ${file.name}`);
            return null;
          }
        }
      });

      try {
        await Promise.all(uploadPromises);
        message.success('Images uploaded successfully');
      } catch (error) {
        console.error('Error uploading images:', error);
        message.error('Some images failed to upload');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const handleCreateAnyway = () => {
    setShowDuplicates(false);
  };

  const uploadProps: UploadProps = {
    listType: 'picture',
    accept: 'image/jpeg,image/png,image/webp',
    multiple: true,
    fileList,
    beforeUpload: (file) => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      if (!isValidType) {
        message.error('You can only upload JPG/PNG/WebP files!');
        return false;
      }
      return false; // Prevent automatic upload
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
  };

  if (showDuplicates) {
    return (
      <Modal
        title="Potential Duplicates Found"
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Text>
            We found some events that might be duplicates. Please review them:
          </Text>
          {duplicates.map(({ event: dupEvent, similarityScore }) => (
            <Card key={dupEvent.id} size="small">
              <Space direction="vertical">
                <Text strong>{dupEvent.title}</Text>
                <Text>Dates: {dupEvent.dates.join(', ')}</Text>
                <Text>Location: {dupEvent.location}</Text>
                {dupEvent.city && <Text>City: {dupEvent.city}</Text>}
                <Text type="secondary">
                  Similarity: {Math.round(similarityScore * 100)}%
                </Text>
              </Space>
            </Card>
          ))}
          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleCreateAnyway}>
              Create Anyway
            </Button>
          </Space>
        </Space>
      </Modal>
    );
  }

  return (
    <Modal
      title={mode === 'create' ? 'Create Event' : 'Edit Event'}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...event,
          dates: event?.dates ? event.dates.map(date => dayjs(date)) : [],
          startTime: event?.startTime ? dayjs(event.startTime, 'HH:mm') : undefined,
          endTime: event?.endTime ? dayjs(event.endTime, 'HH:mm') : undefined,
        }}
        onFinish={handleSubmit}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Left Column - Main Information */}
          <div style={{ flex: 1 }}>
            <Typography.Title level={5}>Main Information</Typography.Title>
            
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter the event title' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="dates"
              label="Event Dates"
              rules={[{ required: true, message: 'Please select at least one event date' }]}
            >
              <div>
                <DatePicker 
                  style={{ width: '100%', marginBottom: 8 }} 
                  onChange={handleDateSelect}
                  disabledDate={current => 
                    selectedDates.some(date => date.isSame(current, 'day'))
                  }
                />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {selectedDates.map((date) => (
                    <Tag
                      key={date.valueOf()}
                      closable
                      onClose={() => handleDateRemove(date)}
                      style={{ margin: '4px 0' }}
                    >
                      {date.format('DD MMM YYYY')}
                    </Tag>
                  ))}
                </div>
              </div>
            </Form.Item>

            <div style={{ display: 'flex', gap: 16 }}>
              <Form.Item
                name="startTime"
                label="Start Time"
                style={{ flex: 1 }}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="endTime"
                label="End Time"
                style={{ flex: 1 }}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </div>

            {mode === 'edit' && event?.id && (
              <Form.Item label="Images">
                {event.images && event.images.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                    {event.images.map((image, index) => (
                      <img
                        key={index}
                        src={`/api/local/events/${event.id}/images/${image}`}
                        alt={`Event image ${index + 1}`}
                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                      />
                    ))}
                  </div>
                )}
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />} loading={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Images'}
                  </Button>
                </Upload>
                <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                  Supported formats: JPG, PNG, WebP
                </Text>
              </Form.Item>
            )}
          </div>

          {/* Right Column - Additional Information */}
          <div style={{ flex: 1 }}>
            <Typography.Title level={5}>Location & Classification</Typography.Title>
            
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter the event location' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="city" label="City">
              <Input />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={uploading}>
              {mode === 'create' ? 'Create' : 'Save'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
