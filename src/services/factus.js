import apiClient from "../plugins/factus.js";

export async function  getDataFactus(url){
    try {
        const response = await apiClient.get(url);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('error en la peticion get',error);
       throw error;
    } 
}

export async function  postDataFactus(url, data){
    try {
        const response = await apiClient.post(url, data);
        console.log("service response" ,response)
        return response.data;
    } catch (error) {
        console.error('error en la peticion post',error);
       throw error;
    }
}

export async function  putDataFactus(url, data){
    try {
        const response = await apiClient.put(url, data);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('error en la peticion put',error);
       throw error;
    }
}