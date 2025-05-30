import { useState } from 'react';
import { Typography, List, Card, Space, Spin, Tag, DatePicker } from 'antd';
import { useEvents } from '@/hooks/useEvents';
import dayjs from 'dayjs';
import type { Event } from '@/utils/localeventApi';
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

type DateRange<T> = [T | null, T | null];

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
  const { data: events = [], isLoading, error } = useEvents(formatDateRange(dateRange));

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
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>Local Events</Title>
          <Space direction="vertical" size="small">
            <RangePicker
              value={dateRange as [dayjs.Dayjs, dayjs.Dayjs]}
              onChange={(dates) => setDateRange(dates as DateRange<dayjs.Dayjs>)}
              allowClear={false}
              style={{ marginBottom: 16 }}
            />
            <Text type="secondary">Select date range to view events</Text>
          </Space>
        </div>

        {events.length === 0 ? (
          <Text>No events found for the selected period.</Text>
        ) : (
          <List
            dataSource={events}
            renderItem={(event) => (
              <List.Item key={event.id}>
                <Card style={{ width: '100%' }}>
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
    </div>
  );
}

export default LocalEventPage;
