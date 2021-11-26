const handleError = (err, res) => {
  res.writeHead(err.statusCode || 500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: err.message || "Internal server error" }));
};

module.exports = {
  handleError
};
