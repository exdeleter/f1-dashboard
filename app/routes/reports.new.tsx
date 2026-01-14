import type { Route } from "./+types/reports.new";
import { useNavigate } from "react-router";
import { ReportBuilder } from "~/reports/components/ReportBuilder";
import { createNewReport, saveReport } from "~/reports/utils/reportStorage";
import { useState } from "react";
import type { Report } from "~/reports/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Report - F1 Dashboard" },
    { name: "description", content: "Create new report" },
  ];
}

export default function NewReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState<Report>(() => createNewReport());

  const handleReportChange = (updatedReport: Report) => {
    setReport(updatedReport);
  };

  const handleSave = () => {
    const savedReport = saveReport(report);
    navigate(`/reports/${savedReport.id}`);
  };

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