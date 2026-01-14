import type { Route } from "./+types/reports.index";
import { Link } from "react-router";
import { getAllReports, deleteReport } from "~/reports/utils/reportStorage";
import { useState, useEffect } from "react";
import type { Report } from "~/reports/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reports - F1 Dashboard" },
    { name: "description", content: "List of reports" },
  ];
}

export default function ReportsList() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    setReports(getAllReports());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этот отчет?")) {
      deleteReport(id);
      setReports(getAllReports());
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Отчеты</h1>
        <Link
          to="/reports/new"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium transition-colors"
        >
          + Создать отчет
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">Нет сохраненных отчетов</p>
          <Link
            to="/reports/new"
            className="text-red-600 hover:text-red-500 underline"
          >
            Создать первый отчет
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 bg-[#0b0f14] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                {report.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Элементов: {report.pages[0]?.elements.length || 0}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/reports/${report.id}`}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm text-center transition-colors"
                >
                  Редактировать
                </Link>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm transition-colors"
                >
                  Удалить
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Обновлено: {new Date(report.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}