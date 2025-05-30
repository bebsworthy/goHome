import { useState } from 'react';
import { Typography, List, Card, Space, Spin, Tag, DatePicker, Radio, Button, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useEvents } from '@/hooks/useEvents';
import dayjs from 'dayjs';
import type { Event } from '@/utils/localeventApi';
import { EditEventForm } from './EditEventForm';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

type DateRange<T> = [T | null, T | null];
type QuickSelect = 'custom' | 'thisWeek' | 'thisWeekend' | 'next15Days';

function getThisWeekendRange(): DateRange<dayjs.Dayjs> {
  const start = dayjs().day(6); // Saturday
  const end = dayjs().day(7); // Sunday
  return [start, end];
}

function getDefaultDateRange(): DateRange<dayjs.Dayjs> {
  const start = dayjs();
  const end = dayjs().add(15, 'day');
  return [start, end];
}

function formatDateRange(range: DateRange<dayjs.Dayjs>): { start: string; end: string } {
  return {
    start: range[0]?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
    end: range[1]?.format('YYYY-MM-DD') || dayjs().add(15, 'day').format('YYYY-MM-DD')
  };
}

function formatDate(dates: string[]): string {
  if (dates.length === 1) {
    return new Date(dates[0]).toLocaleDateString();
  }
  return `${new Date(dates[0]).toLocaleDateString()} - ${new Date(dates[dates.length - 1]).toLocaleDateString()}`;
}

function formatTime(startTime?: string, endTime?: string): string {
  if (!startTime) return '';
  if (!endTime) return startTime;
  return `${startTime} - ${endTime}`;
}

function LocalEventPage() {
  const [dateRange, setDateRange] = useState<DateRange<dayjs.Dayjs>>(getDefaultDateRange());
  const [quickSelect, setQuickSelect] = useState<QuickSelect>('next15Days');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [modal, contextHolder] = Modal.useModal();
  const { 
    data: events = [], 
    isLoading, 
    error, 
    updateEvent, 
    deleteEvent, 
    isUpdating, 
    isDeleting
  } = useEvents(formatDateRange(dateRange));

  const handleQuickSelectChange = (value: QuickSelect) => {
    setQuickSelect(value);
    switch (value) {
      case 'thisWeekend':
        setDateRange(getThisWeekendRange());
        break;
      case 'next15Days':
        setDateRange(getDefaultDateRange());
        break;
      // No default case needed as 'custom' doesn't change the date range
    }
  };

  const handleRangePickerChange = (dates: any) => {
    if (dates) {
      setDateRange(dates as DateRange<dayjs.Dayjs>);
    }
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
  };

  const handleEditCancel = () => {
    setEditingEvent(null);
  };

  const handleEditSave = async (updatedEvent: Event) => {
    try {
      await updateEvent(updatedEvent);
      message.success('Event updated successfully');
      setEditingEvent(null);
    } catch (error) {
      message.error('Failed to update event');
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteClick = (event: Event) => {
    modal.confirm({
      title: 'Delete Event',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete "${event.title}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteEvent(event.id);
          message.success('Event deleted successfully');
        } catch (err) {
          const error = err as Error;
          message.error('Failed to delete event');
          console.error('Failed to delete event:', error);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Text type="danger" style={{ fontSize: 16 }}>
          Error: {error instanceof Error ? error.message : 'An error occurred'}
        </Text>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>Local Events</Title>
          <Space direction="vertical" size="middle">
            <Radio.Group value={quickSelect} onChange={(e) => handleQuickSelectChange(e.target.value)}>
              <Radio.Button value="next15Days">Next 15 Days</Radio.Button>
              <Radio.Button value="thisWeekend">This Weekend</Radio.Button>
              <Radio.Button value="custom">Custom Dates</Radio.Button>
            </Radio.Group>
            {quickSelect === 'custom' && (
              <RangePicker
                value={dateRange as [dayjs.Dayjs, dayjs.Dayjs]}
                onChange={handleRangePickerChange}
                allowClear={false}
                style={{ width: '100%', maxWidth: 400 }}
              />
            )}
          </Space>
        </div>

        {events.length === 0 ? (
          <Text>No events found for the selected period.</Text>
        ) : (
          <List
            dataSource={events}
            renderItem={(event) => (
              <List.Item key={event.id}>
                <Card 
                  style={{ width: '100%' }}
                  extra={
                    <Space>
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEditClick(event)}
                        loading={isUpdating}
                      >
                        Edit
                      </Button>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteClick(event)}
                        loading={isDeleting}
                      >
                        Delete
                      </Button>
                    </Space>
                  }
                >
                  <Title level={4} style={{ marginTop: 0 }}>{event.title}</Title>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Text type="secondary">
                      {formatDate(event.dates)}
                      {event.startTime && (
                        <> • {formatTime(event.startTime, event.endTime)}</>
                      )}
                    </Text>
                    <Text>
                      {event.location}
                      {event.city && <>, {event.city}</>}
                    </Text>
                    {event.description && (
                      <Text type="secondary">{event.description}</Text>
                    )}
                    <Space size={[0, 8]} wrap>
                      {event.price && (
                        <Tag color="blue">{event.price}</Tag>
                      )}
                      {event.category && (
                        <Tag>{event.category}</Tag>
                      )}
                    </Space>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Space>

      {editingEvent && (
        <EditEventForm
          event={editingEvent}
          open={true}
          onCancel={handleEditCancel}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}

export default LocalEventPage;
