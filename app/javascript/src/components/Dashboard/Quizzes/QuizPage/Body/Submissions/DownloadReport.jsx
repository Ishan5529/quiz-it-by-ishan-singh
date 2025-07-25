import React, { useEffect, useState } from "react";

import attemptsApi from "apis/attempts";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/commons";
import { useUserState } from "contexts/user";
import FileSaver from "file-saver";
import { Modal } from "neetoui";
import { useParams } from "react-router-dom";

const DownloadReport = ({ isOpen = true, setIsOpen }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const { user } = useUserState();

  const { slug } = useParams();

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await attemptsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data } = await attemptsApi.download(slug);
      FileSaver.saveAs(data, "quiz_submission_report.pdf");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      userId: user.id,
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (progress === 100) {
      setMessage("Downloading report");
      downloadPdf();
      setIsOpen(false);
    }
  }, [progress]);

  return (
    <Modal
      closeButton={false}
      closeOnOutsideClick={false}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="space-y-2 p-6">
        <p className="text-xl font-semibold">{message}</p>
        <ProgressBar progress={progress} />
      </div>
    </Modal>
  );
};

export default DownloadReport;
