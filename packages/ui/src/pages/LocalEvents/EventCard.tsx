import { Card, Space, Typography, Tag, Button, Image, Carousel, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Event } from '@/utils/localeventApi';

const { Title, Text } = Typography;

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
  isUpdating: boolean;
  isDeleting: boolean;
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

export function EventCard({ event, onEdit, onDelete, isUpdating, isDeleting }: EventCardProps) {
  return (
    <Card
      style={{ width: '100%' }}
      cover={
        event.images && event.images.length > 0 && (
          <div style={{ height: 300, backgroundColor: '#f0f0f0' }}>
            <Carousel arrows autoplay={false}>
              {event.images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={`/api/local/events/${event.id}/images/${image}`}
                    alt={`Event ${event.title} image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: 300,
                      objectFit: 'cover',
                    }}
                    preview={{
                      mask: 'Click to zoom',
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )
      }
      actions={[
        <Button
          key="edit"
          icon={<EditOutlined />}
          onClick={() => onEdit(event)}
          loading={isUpdating}
        >
          Edit
        </Button>,
        <Button
          key="delete"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(event)}
          loading={isDeleting}
        >
          Delete
        </Button>,
      ]}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Title level={4} style={{ marginTop: 0 }}>{event.title}</Title>
        
        <Text type="secondary">
          {formatDate(event.dates)}
          {event.startTime && (
            <> • {formatTime(event.startTime, event.endTime)}</>
          )}
        </Text>

        <Text strong>
          {event.location}
          {event.city && <>, {event.city}</>}
        </Text>

        {event.description && (
          <Text type="secondary">{event.description}</Text>
        )}

        {/* Tags section */}
        <Space size={[0, 8]} wrap>
          {event.price && (
            <Tag color="blue">{event.price}</Tag>
          )}
          {event.category && (
            <Tag>{event.category}</Tag>
          )}
          {event.organizer && (
            <Tag color="green">Organizer: {event.organizer}</Tag>
          )}
        </Space>

        {/* Additional information section */}
        <Space direction="vertical" size="small" style={{ 
          backgroundColor: '#fafafa',
          padding: 12,
          borderRadius: 6,
          marginTop: 8
        }}>
          <Title level={5} style={{ marginTop: 0 }}>Additional Information</Title>
          <Space direction="vertical" size={0}>
            {event.email && (
              <Tooltip title="Contact email">
                <Text copyable>{event.email}</Text>
              </Tooltip>
            )}
            {event.phone && (
              <Tooltip title="Contact phone">
                <Text copyable>{event.phone}</Text>
              </Tooltip>
            )}
            {event.duplicateOfId && (
              <Text type="warning">
                Duplicate of Event #{event.duplicateOfId}
                {event.similarityScore && ` (${(event.similarityScore * 100).toFixed(1)}% similar)`}
              </Text>
            )}
            <Text type="secondary">Event ID: {event.id}</Text>
          </Space>
        </Space>
      </Space>
    </Card>
  );
}
