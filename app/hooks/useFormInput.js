import { useState } from 'react';

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (text) => {
    setValue(text);
  };

  return { value, onChangeText: handleChange };
};
