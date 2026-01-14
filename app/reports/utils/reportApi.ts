import type { Report, ReportParams } from '../types';

const API_BASE_URL = /*process.env.API_BASE_URL || */'/api/reports';

/**
 * Отправка JSON структуры отчета на backend для генерации PDF
 */
export async function generateReport(
  report: Report,
  params?: ReportParams
): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reportId: report.id,
      name: report.name,
      pages: report.pages,
      parameters: {
        ...report.parameters,
        ...params,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate report: ${response.statusText}`);
  }

  return response;
}

/**
 * Сохранение структуры отчета на backend
 */
export async function saveReport(report: Report): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error(`Failed to save report: ${response.statusText}`);
  }

  return response;
}

/**
 * Обновление существующего отчета на backend
 */
export async function updateReport(report: Report): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/${report.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...report,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update report: ${response.statusText}`);
  }

  return response;
}

/**
 * Загрузка отчета с backend
 */
export async function loadReport(id: string): Promise<Report> {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to load report: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получение списка всех отчетов
 */
export async function listReports(): Promise<Report[]> {
  const response = await fetch(`${API_BASE_URL}`);

  if (!response.ok) {
    throw new Error(`Failed to list reports: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Удаление отчета
 */
export async function deleteReport(id: string): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete report: ${response.statusText}`);
  }

  return response;
}