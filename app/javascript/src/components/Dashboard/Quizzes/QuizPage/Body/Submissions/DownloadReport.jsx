import React, { useEffect, useState } from "react";

import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/commons";
import { useUserState } from "contexts/user";
import {
  useAttemptsGeneratePdf,
  useAttemptsDownloadReport,
} from "hooks/reactQuery/useAttemptsApi";
import { Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const DownloadReport = ({ isOpen = true, setIsOpen }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const { slug } = useParams();

  const { user } = useUserState();
  const consumer = createConsumer();

  const { mutate: generateReport } = useAttemptsGeneratePdf();
  const { mutateAsync: downloadPdf } = useAttemptsDownloadReport();

  const { t } = useTranslation();

  const generatePdf = () => {
    generateReport({ slug });
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
      const downloadingMessage = t("misc.downloading");
      setMessage(downloadingMessage);
      downloadPdf({ slug });
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
        <Typography className="text-xl font-semibold" style="body2">
          {message}
        </Typography>
        <ProgressBar {...{ progress }} />
      </div>
    </Modal>
  );
};

export default DownloadReport;
