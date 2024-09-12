import ErrorClass from "../utils/Error-class.js";



export const errorHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch((err) => {
      next(new ErrorClass(err.message, 500 ));
    });
  };
};

// Global response middleware
export const globalResponse = (err, req, res, next) => {
   if(err){
      res.status(err.status||500).json({
        message:'Internal server error',
        error_msg:err.message,
        error : err?.error,
        error_stack : err?.stack
        
      })
      
   }
}
