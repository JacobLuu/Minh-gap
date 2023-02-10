const handleChangeURLParams = ({ params, search }) => {
  const currentParamsObject = new URLSearchParams(search);
  const paramKeys = Object.keys(params);
  let hasURLChanged = false;
  paramKeys.forEach((key) => {
    const currentValue = params[key];
    const oldValue = currentParamsObject.get(key);
    if (oldValue !== `${currentValue}`) {
      if (!currentValue) {
        currentParamsObject.delete(key);
      } else {
        currentParamsObject.set(key, currentValue);
      }
      hasURLChanged = true;
    }
  });
  // Only navigate when the URL string changes
  if (hasURLChanged) {
    return currentParamsObject.toString();
  }
};
export default handleChangeURLParams;
