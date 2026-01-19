import type { Route } from "./+types/reports.$id";
import { useParams, useNavigate } from "react-router";
import { ReportBuilder } from "~/reports/components/ReportBuilder";
import { getReportById, saveReport } from "~/reports/utils/reportStorage";
import { useState, useEffect } from "react";
import type { Report } from "~/reports/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Report - F1 Dashboard" },
    { name: "description", content: "Edit report" },
  ];
}

export default function EditReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/reports");
      return;
    }

    const loadedReport = getReportById(id);
    if (!loadedReport) {
      navigate("/reports");
      return;
    }

    setReport(loadedReport);
    setLoading(false);
  }, [id, navigate]);

  const handleReportChange = (updatedReport: Report) => {
    setReport(updatedReport);
  };

  const handleSave = () => {
    if (report) {
      saveReport(report);
      alert("Отчет сохранен!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Загрузка...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Отчет не найден</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ReportBuilder
        report={report}
        onReportChange={handleReportChange}
        onSave={handleSave}
      />
    </div>
  );
}

