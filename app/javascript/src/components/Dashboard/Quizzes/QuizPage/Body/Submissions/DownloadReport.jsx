import React, { useEffect, useState } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import attemptsApi from "apis/attempts";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/commons";
import { useUserState } from "contexts/user";
import FileSaver from "file-saver";
import { Button } from "neetoui";
import { useParams } from "react-router-dom";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    try {
      const { data } = await attemptsApi.download(slug);
      FileSaver.saveAs(data, "quiz_submission_report.pdf");
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
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
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
      setMessage("Report is ready to be downloaded");
    }
  }, [progress]);

  return (
    <Container className="w-full">
      <div className="flex flex-col gap-y-8">
        <h1>Download report</h1>
        <div className="mb-4 w-full">
          <div className="mx-auto mb-4 w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-800 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-2xl">
            <div className="space-y-2 p-6">
              <p className="text-xl font-semibold">{message}</p>
              <ProgressBar progress={progress} />
            </div>
          </div>
          <Button label="Download" loading={isLoading} onClick={downloadPdf} />
        </div>
      </div>
    </Container>
  );
};

export default DownloadReport;
