export const removeEmptyValues = (obj) => {
  const finalObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      const nestedObj = removeEmptyValues(obj[key]);
      if (Object.keys(nestedObj).length) {
        finalObj[key] = nestedObj;
      }
    } else if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
      finalObj[key] = obj[key];
    }
  });
  return finalObj;
};
