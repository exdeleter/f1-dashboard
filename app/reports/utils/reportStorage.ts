import type { Report } from '../types';
import { createMockReport } from '../mockData';

// In-memory хранилище (живёт только в памяти процесса)
let reportsStore: Report[] | null = null;

/**
 * Инициализация mock-данных (один раз)
 */
function initializeStore(): Report[] {
  if (!reportsStore) {
    reportsStore = [createMockReport()];
  }
  return reportsStore;
}

/**
 * Получить все отчеты
 */
export function getAllReports(): Report[] {
  try {
    return initializeStore();
  } catch (error) {
    console.error('Failed to load reports:', error);
    return [];
  }
}

/**
 * Получить отчет по ID
 */
export function getReportById(id: string): Report | null {
  const reports = getAllReports();
  return reports.find((r) => r.id === id) ?? null;
}

/**
 * Сохранить отчет (создать новый или обновить существующий)
 */
export function saveReport(report: Report): Report {
  const reports = getAllReports();
  const existingIndex = reports.findIndex((r) => r.id === report.id);

  const now = new Date().toISOString();

  const updatedReport: Report = {
    ...report,
    updatedAt: now,
    createdAt:
        existingIndex >= 0
            ? reports[existingIndex].createdAt
            : now,
  };

  if (existingIndex >= 0) {
    reports[existingIndex] = updatedReport;
  } else {
    reports.push(updatedReport);
  }

  return updatedReport;
}

/**
 * Удалить отчет
 */
export function deleteReport(id: string): boolean {
  const reports = getAllReports();
  const initialLength = reports.length;

  reportsStore = reports.filter((r) => r.id !== id);

  return reportsStore.length < initialLength;
}

/**
 * Создать новый пустой отчет
 */
export function createNewReport(
    name: string = 'Новый отчет',
): Report {
  const now = new Date().toISOString();

  const newReport: Report = {
    id: `report-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    name,
    pages: [
      {
        id: 'page-1',
        elements: [],
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  return saveReport(newReport);
}