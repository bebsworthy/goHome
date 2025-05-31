import { Modal, Form, Input, TimePicker, Button, Space, Card, Typography, DatePicker } from 'antd';
import type { Event } from '@/utils/localeventApi';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useState } from 'react';
import type { RangePickerProps } from 'antd/es/date-picker';

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
  const [showDuplicates, setShowDuplicates] = useState(duplicates.length > 0);

  const handleSubmit = (values: any) => {
    const eventData = {
      ...(event || {}),
      ...values,
      dates: values.dates ? [
        values.dates[0].format('YYYY-MM-DD'),
        values.dates[1].format('YYYY-MM-DD')
      ] : [],
      startTime: values.startTime?.format('HH:mm'),
      endTime: values.endTime?.format('HH:mm'),
    };
    onSave(eventData);
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleCreateAnyway = () => {
    setShowDuplicates(false);
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
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...event,
          dates: event?.dates ? [
            dayjs(event.dates[0]), 
            dayjs(event.dates[event.dates.length - 1])
          ] : undefined,
          startTime: event?.startTime ? dayjs(event.startTime, 'HH:mm') : undefined,
          endTime: event?.endTime ? dayjs(event.endTime, 'HH:mm') : undefined,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the event title' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="dates"
          label="Dates"
          rules={[{ required: true, message: 'Please select event dates' }]}
        >
          <DatePicker.RangePicker style={{ width: '100%' }} />
        </Form.Item>

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

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="price" label="Price">
          <Input />
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Input />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Start Time"
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="endTime"
          label="End Time"
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {mode === 'create' ? 'Create' : 'Save'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
