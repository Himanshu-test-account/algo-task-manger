const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
  
    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field value entered'
      });
    }
  
    // Mongoose Bad ObjectId Error
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }
  
    // Generic Server Error
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || 'Server Error'
    });
  };
  
  module.exports = errorHandler;