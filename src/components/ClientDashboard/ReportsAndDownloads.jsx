import { Download, FileText, BarChart2 } from "lucide-react";
import { Card, CardContent } from "../../assets/animations/card";
import { Button } from "../../assets/animations/button";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { Dialog } from "@headlessui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const reports = [
  {
    title: "Account Statement",
    description: "Monthly consolidated report of all transactions.",
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    fileName: "Account_Statement_July_2025.pdf",
    type: "PDF",
  },
  {
    title: "Capital Gains Report",
    description: "Detailed gains and losses for tax filing.",
    icon: <BarChart2 className="w-6 h-6 text-green-600" />,
    fileName: "Capital_Gains_2024-25.csv",
    type: "CSV",
  },
  {
    title: "Transaction History",
    description: "Export all buy/sell transactions.",
    icon: <FileText className="w-6 h-6 text-purple-600" />,
    fileName: "Transactions_Jan-Aug_2025.pdf",
    type: "PDF",
  },
];

export default function ReportsAndDownloads() {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [previewReport, setPreviewReport] = useState(null);

  const handleDownload = (fileName) => {
    const blob = new Blob(["Simulated file content"], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Date Range Picker */}
      <div className="bg-white p-4 rounded shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Filter by Date</h3>
        <Button variant="outline" onClick={() => setShowPicker(!showPicker)} className="w-full sm:w-auto">
          {`${format(range[0].startDate, "MMM dd, yyyy")} → ${format(range[0].endDate, "MMM dd, yyyy")}`}
        </Button>
        {showPicker && (
          <div className="mt-4 overflow-x-auto">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={range}
              className="max-w-full"
            />
          </div>
        )}
        <p className="text-sm text-gray-500">
          Showing reports from <strong>{format(range[0].startDate, "MMM dd, yyyy")}</strong> to{" "}
          <strong>{format(range[0].endDate, "MMM dd, yyyy")}</strong>
        </p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="shadow-md h-full transition-transform hover:scale-[1.01] hover:shadow-lg">
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 sm:gap-3">
                  {report.icon}
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{report.title}</h3>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    report.type === "PDF"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {report.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 break-words">{report.description}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 w-full sm:w-auto"
                  onClick={() => setPreviewReport(report)}
                >
                  <FileText className="w-4 h-4" /> Preview
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full sm:w-auto"
                  onClick={() => handleDownload(report.fileName)}
                >
                  <Download className="w-4 h-4" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* File Preview Modal */}
      {previewReport && (
        <Dialog
          open={!!previewReport}
          onClose={() => setPreviewReport(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-white max-w-2xl w-full p-4 rounded shadow-lg relative">
            <h2 className="text-lg font-semibold mb-3">{previewReport.title} Preview</h2>

            {previewReport.type === "PDF" ? (
              <iframe
                src={`https://docs.google.com/gview?url=https://example.com/${previewReport.fileName}&embedded=true`}
                className="w-full h-96 border rounded"
                title="PDF Preview"
              />
            ) : (
              <div className="h-96 overflow-auto p-2 bg-gray-100 rounded text-sm font-mono whitespace-pre-wrap">
                Name,Amount,Date{"\n"}Equity,102000,2025-07-01{"\n"}Debt,97000,2025-07-01{"\n"}...
              </div>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setPreviewReport(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  handleDownload(previewReport.fileName);
                  setPreviewReport(null);
                }}
              >
                <Download className="w-4 h-4" /> Download
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
