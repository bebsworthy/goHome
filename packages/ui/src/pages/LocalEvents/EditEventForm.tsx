import { Modal, Form, Input, TimePicker, Button } from 'antd';
import type { Event } from '@/utils/localeventApi';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';

interface EditEventFormProps {
  event: Event;
  open: boolean;
  onCancel: () => void;
  onSave: (updatedEvent: Event) => void;
}

export function EditEventForm({ event, open, onCancel, onSave }: EditEventFormProps) {
  const [form] = useForm();

  const handleSubmit = (values: any) => {
    onSave({
      ...event,
      ...values,
      startTime: values.startTime?.format('HH:mm'),
      endTime: values.endTime?.format('HH:mm'),
    });
  };

  return (
    <Modal
      title="Edit Event"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...event,
          startTime: event.startTime ? dayjs(event.startTime, 'HH:mm') : undefined,
          endTime: event.endTime ? dayjs(event.endTime, 'HH:mm') : undefined,
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
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">Save</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
