// types/registeredUsers.ts
export interface ChartData {
  name: string;
  [key: string]: number | string; // ESB: 20, Sob.: 15, etc.
}

export type ChartType = 'Categoria' | 'Apartado' | 'Base o DVT';

export interface ApiResponse {
  Categoria: ChartData[];
  Apartado: ChartData[];
  'Base o DVT': ChartData[];
}

export interface UseRegisteredUsersChartProps {
  selectedType: ChartType;
  date: string; // yyyy-mm-dd
}

export interface UseRegisteredUsersChartReturn {
  data: ChartData[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}