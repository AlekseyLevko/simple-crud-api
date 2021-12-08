const getParamsPath = (path) => {
  return path.split("/").filter((param) => !!param);
};

module.exports = {
  getParamsPath
};
