import { useState, useCallback } from "react";
import { toast } from 'react-toastify'

const useApi=(apiFunction)=>{

    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const request=useCallback(async(...args)=>{
            setLoading(true);
            setError(null);
            try {
                const response=await apiFunction(...args);
                setData(response.data);
                return response;
            } catch (error) {
                const errorMessage = error.response?.data?.message ||"Something Went Wrong!";
                setError(error);
                toast.error(errorMessage);
            }finally{
                setLoading(false);
            }
        },
        [apiFunction]
    )
    return {
        data,
        loading,
        error,
        request
    }

}

export default useApi;