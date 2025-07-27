import { t } from "i18next";

export const subscribeToReportDownloadChannel = ({
  userId = "",
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "ReportDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage(t("misc.reportDownloadChannelConnected"));
        generatePdf();
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
