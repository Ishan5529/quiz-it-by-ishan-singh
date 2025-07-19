import dayjs from "dayjs";
import * as R from "ramda";

import showToastr from "./showToastr";

const isPresent = R.pipe(R.either(R.isNil, R.isEmpty), R.not);

const generateDraftInfoMessage = ({ date }) => {
  const formattedDate = dayjs(date).format("hh:mmA, DD MMMM YYYY");

  return `Draft saved at ${formattedDate}`;
};

const formatTableDate = date => dayjs(date).format("DD MMMM YYYY, hh:mm A");

export { showToastr, isPresent, generateDraftInfoMessage, formatTableDate };
