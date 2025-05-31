import { useState, useEffect } from 'react';
import { Tabs, List, Card, Image, Typography, Pagination, App } from 'antd';
import dayjs from 'dayjs';
import type { TabsProps } from 'antd';

const { Text } = Typography;

interface ImageInfo {
  name: string;
  path: string;
  lastModified: Date;
  size: number;
}

interface ListImagesResponse {
  images: ImageInfo[];
  total: number;
  page: number;
  pageSize: number;
}

function ImageList({ status }: { status: 'pending' | 'done' | 'failed' }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [data, setData] = useState<ListImagesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  const fetchImages = async (page: number, size: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/local/images?status=${status}&page=${page}&pageSize=${size}`
      );
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setData(data);
    } catch (error) {
      message.error('Failed to load images');
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch images when component mounts or when page/size/status changes
  useEffect(() => {
    fetchImages(currentPage, pageSize);
  }, [currentPage, pageSize, status]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <>
      <List
        loading={loading}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
        dataSource={data?.images || []}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <Image
                  alt={item.name}
                  src={`/api/local/images/${item.name}?status=${status}`}
                  style={{ height: 200, objectFit: 'cover' }}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzE0LTIyOjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDUtMzFUMjI6NDE6MzItMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDUtMzFUMjI6NDE6MzItMDQ6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA1LTMxVDIyOjQxOjMyLTA0OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBlODI3NGY2LTlkZWUtNDM3MS1hOTk5LTQ5ZjAxMWY4ZjM5YiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjA3YzI3MTdmLTk1ZjQtYjU0YS05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"
                />
              }
            >
              <Card.Meta
                title={item.name}
                description={
                  <>
                    <Text>Last modified: {dayjs(item.lastModified).format('YYYY-MM-DD HH:mm')}</Text>
                    <br />
                    <Text>Size: {Math.round(item.size / 1024)} KB</Text>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      {data && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.total}
            onChange={handlePageChange}
            showSizeChanger
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
      )}
    </>
  );
}

const ImageManager = () => {
  const [activeTab, setActiveTab] = useState('pending');
  
  const items: TabsProps['items'] = [
    {
      key: 'pending',
      label: 'Pending',
      children: <ImageList status="pending" />,
    },
    {
      key: 'done',
      label: 'Done',
      children: <ImageList status="done" />,
    },
    {
      key: 'failed',
      label: 'Failed',
      children: <ImageList status="failed" />,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={2}>Event Images</Typography.Title>
      <Tabs 
        activeKey={activeTab} 
        items={items}
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  );
};

export default ImageManager;
