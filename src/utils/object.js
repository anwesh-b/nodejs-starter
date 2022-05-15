export function onlyWithAttrs(obj, attrs) {
  return Object.keys(obj).reduce((acc, key) => {
    if (attrs.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
