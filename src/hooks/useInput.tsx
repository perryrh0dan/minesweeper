import { useState } from "react";

export const useInput = (
  initialValue: string,
  validate?: (value: any) => string | null
) => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleValidation(event: any) {
    if (!touched) setTouched(true);
    if (!validate) return;
    const error = validate(event.target.value);
    if (error) {
      return setError(error);
    }
    return setError(null);
  }

  async function validateInput() {
    if (!touched) setTouched(true);
    if (!validate) return true;
    const error = validate(value);
    if (error) {
      setError(error);
      return false;
    }
    return true;
  }

  return {
    value,
    setValue,
    touched,
    error,
    reset: () => setValue(""),
    validate: validateInput,
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.target.value);
      },
      onBlur: (event: any) => {
        handleValidation(event);
      },
    },
  };
};
