import React, { useState, useEffect } from "react";

import attemptsApi from "apis/attempts";
// import { Container, PageTitle, Toastr } from "components/commons";
import { useParams } from "react-router-dom";
import { showToastr } from "utils";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  const generatePdf = async slug => {
    try {
      await attemptsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async slug => {
    try {
      // Toastr.success("Downloading report...");
      showToastr({ message: "Downloading report...", type: "success" });
      const { data } = await attemptsApi.download(slug);
      saveAs({ blob: data, fileName: "quiz_it_quiz_submission_report.pdf" });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePdf(slug);
    setTimeout(() => {
      downloadPdf(slug);
    }, 5000);
  }, []);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8">
        <h1>Download report</h1>
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default DownloadReport;
