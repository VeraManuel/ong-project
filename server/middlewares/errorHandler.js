const handleError = ({ msg, status, data }, req, res, next) => {
  res.status(status).json({ OK: false, error: { msg, status, data } });
};

module.exports = handleError;
