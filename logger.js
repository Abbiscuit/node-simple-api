function log(req, res, next) {
  console.log("Logging..."); // req.body
  next();
}

module.exports = log;
