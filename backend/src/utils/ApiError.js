class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong!",
        stackTrace ="",
        error=[]
    ){
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.data = null;
        this.success=false;
        if(stackTrace){
            this.stack = stackTrace;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError;