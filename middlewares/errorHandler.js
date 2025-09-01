
function errorHandler(err,req,res,next){
  console.error(`[ERROR] ${err.message}`);
    res.status(err.status || 500).json({
        error:true,
        message:err.message || "Internal server error",
        statusCode:err.status || 500
    })
}

module.exports = errorHandler