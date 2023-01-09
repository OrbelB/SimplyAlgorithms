import { useState } from 'react';

export default function useValidateInput(validateValue, value = '') {
  const [enteredValue, setEnteredValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);

  const hasError = !valueIsValid && isTouched;

  // validating when user leaves text box area
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}
