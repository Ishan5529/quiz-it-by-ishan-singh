import dayjs from "dayjs";
import { filterNonNull } from "neetocist";
import * as R from "ramda";

import showToastr from "./showToastr";

const isPresent = R.pipe(R.either(R.isNil, R.isEmpty), R.not);

const generateDraftInfoMessage = ({ date }) => {
  const formattedDate = dayjs(date).format("hh:mmA, DD MMMM YYYY");

  return `Draft saved at ${formattedDate}`;
};

const formatTableDate = date => dayjs(date).format("DD MMMM YYYY, hh:mm A");

const getAlertTitle = (action, count, singular = "quiz", plural = "quizzes") =>
  `${action} ${count} ${count > 1 ? plural : singular}?`;

const filterNonNullAndEmpty = params => {
  const nonNullParams = filterNonNull(params);

  return Object.fromEntries(
    Object.entries(nonNullParams).filter(([_, value]) => !R.isEmpty(value))
  );
};

const capitalize = (str = "") => {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export {
  showToastr,
  isPresent,
  generateDraftInfoMessage,
  filterNonNullAndEmpty,
  formatTableDate,
  getAlertTitle,
  capitalize,
};
