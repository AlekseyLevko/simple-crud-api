const normalizeUrl = (url) => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

module.exports = {
  normalizeUrl
};
