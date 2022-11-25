const CustomErrorHandler = require('../helpers/CustomErrorHandler');

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: 'Internal Server Error',
    ...(process.env.DEBUG_MODE === 'true' && { originalError: err.message }),
  };

  if (err instanceof CustomErrorHandler) {
    statusCode = err.statusCode;
    data = {
      message: err.message,
    };
  }

  res.status(statusCode).json(data);
};

module.exports = errorHandler;
