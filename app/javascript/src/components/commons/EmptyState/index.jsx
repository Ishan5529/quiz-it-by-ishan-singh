import React from "react";

import { Button, Typography } from "neetoui";

import { renderImage } from "./utils";

const EmptyState = ({
  image,
  title,
  subtitle,
  primaryAction,
  primaryActionLabel,
}) => (
  <div className="flex h-full w-full flex-row items-start justify-start">
    <div className="m-auto w-3/5">
      <div className="m-auto mb-8 max-w-sm">{renderImage(image)}</div>
      <Typography className="mb-4 text-center text-2xl font-medium" style="h2">
        {title}
      </Typography>
      <Typography
        className="neeto-ui-text-gray-600 mb-8 text-center text-base font-normal leading-relaxed"
        style="body2"
      >
        {subtitle}
      </Typography>
      <div className="flex flex-row items-center justify-center">
        {primaryAction && (
          <Button
            icon="ri-add-fill"
            label={primaryActionLabel}
            size="small"
            type="primary"
            onClick={primaryAction}
          />
        )}
      </div>
    </div>
  </div>
);

export default EmptyState;
