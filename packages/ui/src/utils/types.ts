export interface Departure {
  stop_point: {
    id: string;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
  route: {
    id: string;
    name: string;
    direction: {
      id: string;
      name: string;
    };
  };
  stop_date_time: {
    departure_date_time: string;
    base_departure_date_time: string;
    arrival_date_time: string;
    base_arrival_date_time: string;
  };
  display_informations: {
    network: string;
    physical_mode: string;
    headsign: string;
    direction: string;
    commercial_mode: string;
    label: string;
  };
}

export interface DeparturesResponse {
  departures: Departure[];
  pagination: {
    total_count: number;
    items_per_page: number;
    start_page: number;
  };
} 