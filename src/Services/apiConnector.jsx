//first import axios
import axios from "axios"
//then create an instance of axios
export const axiosInstance=axios.create();

//return an instance
export const apiConnector=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData:null,
        headers:headers?headers:null,
        params:params?params:null,
    })
}

//i will write this function as handler function taht help me pass values
