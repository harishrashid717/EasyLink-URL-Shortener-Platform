const errorHandler = (err, req, res, next)=>{
    // for development
    console.log(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        isAuthenticated: req.isAuthenticated || false,
        success : false,
        message : err.message, 
        details : err.details,
        errStack : (process.env.NODE_ENV)== 'development' ? err.stack : undefined
    });
};
export default errorHandler;