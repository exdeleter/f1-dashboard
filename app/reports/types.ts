export type ReportElementType = 'header' | 'text' | 'table';

export type TableColumn = {
  key: string;
  label: string;
};

export type HeaderElement = {
  id: string;
  type: 'header';
  content: string;
  level: 1 | 2 | 3;
};

export type TextElement = {
  id: string;
  type: 'text';
  content: string;
};

export type TableElement = {
  id: string;
  type: 'table';
  title?: string;
  columns: TableColumn[];
  dataSource?: string; // для указания источника данных на backend
  filters?: Record<string, any>; // параметры фильтрации данных
};

export type ReportElement = HeaderElement | TextElement | TableElement;

export type ReportPage = {
  id: string;
  elements: ReportElement[];
};

export type Report = {
  id: string;
  name: string;
  pages: ReportPage[];
  parameters?: Record<string, any>; // глобальные параметры отчета (raceId, season и т.д.)
  createdAt: string;
  updatedAt: string;
};

export type ReportParams = Record<string, any>;

