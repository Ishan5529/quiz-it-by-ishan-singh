import React, { useState, useEffect, useRef } from "react";

import classNames from "classnames";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";

const InlineInput = ({
  allowCancel = false,
  name,
  value: propValue,
  placeholder,
  disableHover,
  disableFocus,
  onChange = null,
  onBlur = null,
  originalValue = "",
  className = "",
}) => {
  const [value, setValue] = useState(propValue);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleInputChange = event => {
    setValue(event.target.value);
    if (onChange) onChange(event);
  };

  const handleInputBlur = event => {
    setIsInputFocused(false);
    if (onBlur) onBlur(event);
  };

  const handleSave = event => {
    if (onBlur) onBlur(event);

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleCancel = event => {
    event.preventDefault();
    event.stopPropagation();
    setValue(originalValue);
    if (onChange) {
      const syntheticEvent = {
        ...event,
        target: { ...event.target, value: originalValue, name },
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="relative flex w-full items-center">
      <input
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={value}
        className={classNames(
          "w-full rounded-lg bg-transparent p-2 pr-24 text-3xl font-semibold",
          {
            "hover:outline hover:outline-blue-500 focus:outline": !disableHover,
            "focus:outline-none": disableFocus,
          },
          className
        )}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onFocus={() => setIsInputFocused(true)}
      />
      {allowCancel && isInputFocused && (
        <Button
          className="absolute right-12 h-8 w-8 bg-green-50 text-gray-400 hover:bg-green-100 hover:text-gray-700 focus:outline-none"
          size="small"
          style="text"
          tabIndex={-1}
          type="button"
          onClick={handleSave}
          onMouseDown={e => e.preventDefault()}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
      {allowCancel && isInputFocused && (
        <Button
          className="absolute right-3 h-8 w-8 bg-red-50 text-gray-400 hover:bg-red-100 hover:text-gray-700 focus:outline-none"
          size="small"
          style="text"
          tabIndex={-1}
          type="button"
          onClick={handleCancel}
          onMouseDown={e => e.preventDefault()}
        >
          <Close className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default InlineInput;
