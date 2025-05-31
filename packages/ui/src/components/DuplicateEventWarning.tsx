import { Card, Typography, Space, Button } from 'antd';
import type { DuplicateInfo } from '@/utils/localeventApi';

const { Text } = Typography;

interface DuplicateEventWarningProps {
  duplicates: DuplicateInfo[];
  onView: (eventId: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DuplicateEventWarning({ duplicates, onView, onConfirm, onCancel }: DuplicateEventWarningProps) {
  return (
    <Card 
      title="Potential Duplicate Events Found" 
      style={{ marginBottom: 24 }}
      actions={[
        <Button key="cancel" onClick={onCancel}>
          Cancel Creation
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Create Anyway
        </Button>
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text>
          We found some events that might be duplicates. Please review them before proceeding:
        </Text>
        {duplicates.map(({ event, similarityScore }) => (
          <Card key={event.id} size="small" style={{ width: '100%' }}>
            <Space direction="vertical">
              <Text strong>{event.title}</Text>
              <Text>Dates: {event.dates.join(', ')}</Text>
              <Text>Location: {event.location}</Text>
              {event.city && <Text>City: {event.city}</Text>}
              <Text type="secondary">
                Similarity: {Math.round(similarityScore * 100)}%
              </Text>
              <Button type="link" onClick={() => onView(event.id)}>
                View Event
              </Button>
            </Space>
          </Card>
        ))}
      </Space>
    </Card>
  );
}
