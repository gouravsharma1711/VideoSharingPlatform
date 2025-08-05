class ApiResponse{

    constructor(
        statusCode,
        message,
        data
    ){
        this.statusCode = statusCode;
        this.message = message || "Operation successful";
        this.data = data || null;
        this.success = statusCode < 400;

    }
}

export default ApiResponse;