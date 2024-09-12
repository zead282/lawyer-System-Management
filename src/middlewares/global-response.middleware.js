

// Global response middleware
export const globalResponse = (err, req, res, next) => {
   if(err){
      console.log(err);
      res.status(err['cause']||500).json({
        message:'catch error',
        error_msg:err.message
      })
      
   }
}
