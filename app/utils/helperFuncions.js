export const numericValidation = (text, setter) => {
  if (!isNaN(text)) {
    setter(text);
  }
};
